'use client';

import axios from 'axios'
import { useEffect , useState} from 'react'

export default function useJhon() {
    const [mensaje, setMensaje] = useState()

    useState(() => {
        axios
          .get("http://localhost:3000/api/hello")
          .then(res => {
            setMensaje(res.data)
          })
          .catch(err => {
          })
      }, [])

    return mensaje
}

