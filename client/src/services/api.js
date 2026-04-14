import { API_BASE_URL } from '../utils/constants';

async function handleResponse(response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error = new Error(errorData.message || `HTTP ${response.status}`);
    error.status = response.status;
    error.code = errorData.code;
    throw error;
  }
  return response;
}

export async function get(path) {
  const response = await fetch(`${API_BASE_URL}${path}`);
  await handleResponse(response);
  return response.json();
}

export async function post(path, data) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  await handleResponse(response);
  return response.json();
}

export async function postFile(path, file, fieldName = 'file') {
  const formData = new FormData();
  formData.append(fieldName, file);
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    body: formData,
  });
  await handleResponse(response);
  return response.json();
}

export async function postFiles(path, files, fieldName = 'files') {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append(fieldName, file);
  });
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    body: formData,
  });
  await handleResponse(response);
  return response.json();
}

export async function getBlob(path) {
  const response = await fetch(`${API_BASE_URL}${path}`);
  await handleResponse(response);
  return response.blob();
}
