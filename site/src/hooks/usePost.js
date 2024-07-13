import axios from 'axios'
import React from 'react'

export default function post_data(url,body) {
  return(axios.post(url, {body}).then((result) => result).catch((err) => err))
}
