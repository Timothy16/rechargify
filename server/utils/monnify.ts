// server/utils/monnify.ts
export const getMonnifyConfig = () => {
  const config = useRuntimeConfig();
  return {
    apiKey: config.monnifyApiKey,
    secretKey: config.monnifySecretKey,
    contractCode: config.monnifyContractCode,
    baseUrl: config.monnifyBaseUrl || 'https://sandbox.monnify.com'
  };
};

export const getMonnifyToken = async (): Promise<string> => {
  const { apiKey, secretKey, baseUrl } = getMonnifyConfig();

  // Base64 encode API Key:Secret Key
  const credentials = Buffer.from(`${apiKey}:${secretKey}`).toString('base64');

  const response = await $fetch<any>(`${baseUrl}/api/v1/auth/login`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.requestSuccessful) {
    throw new Error('Failed to authenticate with Monnify');
  }

  return response.responseBody.accessToken;
};