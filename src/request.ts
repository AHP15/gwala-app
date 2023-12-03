type Options = {
  method: string,
  body?: string,
  headers?: {
    'Content-Type': 'application/json';
  }
};


export type Response = {
  success: boolean,
  error: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
};

export default async function request(url: string, options: Options): Promise<Response> {
  try {
    const res = await fetch(url, options);
    return res.json();
  } catch (err) {
    if (err instanceof Error) {
      return {
        success: false,
        error: err.message,
        data: null,
      };
    }

    return {
      success: false,
      error: 'An unexpected error occurred',
      data: null,
    };
  }
}
