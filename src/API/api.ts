export interface libraryPost {
  id: string,
  content: string,
  date: string,
  metadata: {
    tags: string[]
  }
}

const baseURL = 'https://api.api-it.io/glom-archive';



export const login = async () => {
  return fetch(`https://api.api-it.io/login`,
    {
      method: 'POST',
      body: JSON.stringify({
        UserName: 'MotherNight',
        Password: 'BrotherCrow'
      })
    }).then(async result => {
      const body = await result.json()
    return body.Result.token as string;
    })
}

export const getLoreList = async (loginToken: string): Promise<string[]> => {
  return fetch(`${baseURL}/list`,
    {
      method: 'GET',
      headers: {
        authorization: `bearer ${loginToken}`
      }
    }).then(async result => {
    const body = await result.json()
    console.log('loreList', body)
    return body as string[];
  });
}

export const postLore = (loginToken: string, toUpload: libraryPost) => {
  fetch(`${baseURL}/${toUpload.id}`,
    {
    method: 'POST',
      headers: {
        authorization: `bearer ${loginToken}`
      }
  }).then()
}
