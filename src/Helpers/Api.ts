import { WordData } from '../Types/WordData';

interface FetchDataResult {
  data: WordData[] | null;
  error: boolean;
}

export async function fetchData(searchQuery: string): Promise<FetchDataResult> {
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchQuery}`);
    const data = await response.json();
    if (data.hasOwnProperty('title') && data.title === 'No Definitions Found') {
      return { data: null, error: true };
    }
    return { data, error: false };
  } catch (error) {
    console.error('Error: ', error);
    return { data: null, error: true };
  }
}