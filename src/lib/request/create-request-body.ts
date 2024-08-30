import { RequestType } from './create-request';

export const createRequestBody = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: Record<string, any> | undefined,
  type: RequestType,
): FormData | string | undefined => {
  if (!body) return;

  if (type === 'json') return JSON.stringify(body);

  const formData = new FormData();

  for (const [key, value] of Object.entries(body)) {
    if (value) {
      if (Array.isArray(value)) {
        for (const file of value) {
          console.log({ key, file });
          formData.append(key, file);
        }
      } else {
        formData.append(key, value);
      }
    }
  }

  return formData;
};
