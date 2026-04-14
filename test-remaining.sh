#!/bin/bash
cd /Users/devteam/Desktop/Convertex

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

declare -a RESULTS

poll_and_download() {
  local name="$1"
  local job_id="$2"
  local output_file="$3"
  local max_attempts=60
  local attempt=0

  if [ -z "$job_id" ] || [ "$job_id" = "null" ]; then
    echo "FAIL|0|No jobId returned"
    return
  fi

  while [ $attempt -lt $max_attempts ]; do
    sleep 2
    attempt=$((attempt + 1))
    local status_resp=$(curl -s "http://localhost:5000/api/convert/status/${job_id}")
    local status=$(echo "$status_resp" | python3 -c "import sys,json; print(json.load(sys.stdin).get('status','unknown'))" 2>/dev/null)

    if [ "$status" = "completed" ]; then
      curl -s "http://localhost:5000/api/convert/download/${job_id}" -o "test-files/${output_file}"
      local fsize=$(stat -f%z "test-files/${output_file}" 2>/dev/null || echo "0")
      if [ "$fsize" -gt 0 ] 2>/dev/null; then
        echo "PASS|${fsize}|OK"
      else
        echo "FAIL|0|Downloaded file is empty"
      fi
      return
    elif [ "$status" = "failed" ]; then
      local errmsg=$(echo "$status_resp" | python3 -c "import sys,json; print(json.load(sys.stdin).get('error','unknown error'))" 2>/dev/null)
      echo "FAIL|0|${errmsg}"
      return
    fi
  done
  echo "FAIL|0|Timeout after ${max_attempts} attempts"
}

run_test() {
  local num="$1"
  local name="$2"
  local output_ext="$3"
  local curl_cmd="$4"

  printf "${YELLOW}[%2d/18] %-20s${NC} " "$num" "$name"

  local resp=$(eval "$curl_cmd")
  local job_id=$(echo "$resp" | python3 -c "import sys,json; print(json.load(sys.stdin).get('jobId',''))" 2>/dev/null)

  if [ -z "$job_id" ] || [ "$job_id" = "" ]; then
    local errmsg=$(echo "$resp" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('error','') + ': ' + d.get('message','unknown'))" 2>/dev/null)
    printf "${RED}FAIL${NC} - Submit failed: %s\n" "$errmsg"
    RESULTS+=("$name|FAIL|0|Submit failed: $errmsg")
    return
  fi

  printf "jobId=%s polling..." "$job_id"

  local result=$(poll_and_download "$name" "$job_id" "output-${name}.${output_ext}")
  local status=$(echo "$result" | cut -d'|' -f1)
  local fsize=$(echo "$result" | cut -d'|' -f2)
  local note=$(echo "$result" | cut -d'|' -f3-)

  if [ "$status" = "PASS" ]; then
    printf "\r${GREEN}[%2d/18] %-20s PASS${NC}  size=%s bytes\n" "$num" "$name" "$fsize"
  else
    printf "\r${RED}[%2d/18] %-20s FAIL${NC}  %s\n" "$num" "$name" "$note"
  fi
  RESULTS+=("$name|$status|$fsize|$note")
}

echo "============================================"
echo "  Retrying tests 11-18 (with 8s delays)"
echo "============================================"
echo ""

echo "Waiting 60 seconds for rate limit to reset..."
sleep 60

# 11. merge-pdf
run_test 11 "merge-pdf" "pdf" \
  'curl -s -X POST http://localhost:5000/api/convert/merge-pdf -F "files=@test-files/test.pdf;type=application/pdf" -F "files=@test-files/test2.pdf;type=application/pdf"'
sleep 8

# 12. split-pdf
run_test 12 "split-pdf" "zip" \
  'curl -s -X POST http://localhost:5000/api/convert/split-pdf -F "file=@test-files/test.pdf;type=application/pdf"'
sleep 8

# 13. compress-pdf
run_test 13 "compress-pdf" "pdf" \
  'curl -s -X POST http://localhost:5000/api/convert/compress-pdf -F "file=@test-files/test.pdf;type=application/pdf"'
sleep 8

# 14. image-compress
run_test 14 "image-compress" "png" \
  'curl -s -X POST http://localhost:5000/api/convert/image-compress -F "file=@test-files/test.png;type=image/png"'
sleep 8

# 15. word-to-html
run_test 15 "word-to-html" "html" \
  'curl -s -X POST http://localhost:5000/api/convert/word-to-html -F "file=@test-files/test.docx;type=application/vnd.openxmlformats-officedocument.wordprocessingml.document"'
sleep 8

# 16. html-to-pdf
run_test 16 "html-to-pdf" "pdf" \
  'curl -s -X POST http://localhost:5000/api/convert/html-to-pdf -F "file=@test-files/test.html;type=text/html"'
sleep 8

# 17. csv-to-excel
run_test 17 "csv-to-excel" "xlsx" \
  'curl -s -X POST http://localhost:5000/api/convert/csv-to-excel -F "file=@test-files/test.csv;type=text/csv"'
sleep 8

# 18. excel-to-csv
run_test 18 "excel-to-csv" "csv" \
  'curl -s -X POST http://localhost:5000/api/convert/excel-to-csv -F "file=@test-files/test.xlsx;type=application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"'

# Print summary
echo ""
echo "============================================"
echo "     RETRY RESULTS (Tests 11-18)"
echo "============================================"
printf "%-4s %-22s %-8s %-12s %s\n" "#" "Converter" "Status" "File Size" "Notes"
printf "%-4s %-22s %-8s %-12s %s\n" "---" "--------------------" "------" "----------" "-----"

pass_count=0
fail_count=0
i=11
for r in "${RESULTS[@]}"; do
  name=$(echo "$r" | cut -d'|' -f1)
  status=$(echo "$r" | cut -d'|' -f2)
  fsize=$(echo "$r" | cut -d'|' -f3)
  note=$(echo "$r" | cut -d'|' -f4-)

  if [ "$status" = "PASS" ]; then
    pass_count=$((pass_count + 1))
    size_display="${fsize} bytes"
  else
    fail_count=$((fail_count + 1))
    size_display="-"
  fi

  printf "%-4s %-22s %-8s %-12s %s\n" "$i." "$name" "$status" "$size_display" "$note"
  i=$((i + 1))
done

echo ""
echo "  Retry batch: ${pass_count} PASSED / ${fail_count} FAILED out of 8"
echo "============================================"
