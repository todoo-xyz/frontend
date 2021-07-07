import {createContext, useState, useEffect} from "react";
import {useRouter} from 'next/router';

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  const login = async () => {

  }

  const logout = async() => {

  }
}
