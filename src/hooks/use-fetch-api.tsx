import { useState, useEffect } from 'react';
import Axios from 'axios';

export function useFetchApi(url: string) {
  const [state, setState] = useState({ data: [], loading: true });

  useEffect(() => {
    setState((state: any) => ({ data: state.data, loading: true }));
    let cancel: any;
    async function FetchPokeData() {
      Axios.get(url, {
        cancelToken: new Axios.CancelToken((c: any) => (cancel = c)),
      }).then((res: any) => {
        setState({ data: res.data.results, loading: false });
      });
    }
    FetchPokeData();
    return () => cancel();
  }, [url, setState]);
  return state;
}
