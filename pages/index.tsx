import SmallContainer from "@/layouts/SmallContainer";
import Logo from "@/components/layout/Logo";
import Input, {InputTypes} from "@/components/forms/Input";
import {ChangeEvent, useState} from "react";
import Btn from "@/components/forms/Btn";
import {useRouter} from "next/router";
import Link from 'next/link'
import {ApiLoginResponse} from "@/typings/ApiLoginResponse";
import ErrorAlert from "@/components/ErrorAlert";

export default function Home() {
  const Router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [validationError, setValidationError] = useState<Array<string>>([])

  const signInBtnClicked = async () => {
    setValidationError([])
    const res = await fetch('/api/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password,
      })
    })
    if (res.status === 422 ) {
      const errors: ApiLoginResponse = await res.json()
      setValidationError(errors.errors)
    }
  }

  return (
    <SmallContainer hasBoarder={true}>
      <div className={"text-center mb-10"}>
        <Logo />
      </div>
      {validationError.length >= 1 &&
        <div className={"w-full"}>
            <ErrorAlert>
              <ul className="list-disc list-inside">
                {validationError.map((item, index) => {
                  return (<li key={index}>{item}</li>)
                })}
              </ul>
            </ErrorAlert>
        </div>
      }
      <div className="w-full">
        <Input
          placeholder={"Email"}
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          isRequired={true}
        />
      </div>
      <div className="w-full">
        <Input
          placeholder={"Password"}
          type={InputTypes.password}
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          isRequired={true}
        />
      </div>
      <div className="w-full">
        <div className="w-6/12 inline-block">
          <Btn onClick={signInBtnClicked}>Sign in</Btn>
        </div>
        <div className={"w-6/12 inline-block text-right"}>
          <Link href={"/register"}>
            <a>
              <Btn onClick={() => {}}>Register</Btn>
            </a>
          </Link>
        </div>
      </div>
    </SmallContainer>
  )
}
