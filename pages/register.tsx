import Logo from "@/components/layout/Logo";
import Input, {InputTypes} from "@/components/forms/Input";
import {ChangeEvent, useState} from "react";
import Btn from "@/components/forms/Btn";
import Link from 'next/link'
import {ApiLoginResponse} from "@/typings/ApiLoginResponse";
import ErrorAlert from "@/components/ErrorAlert";
import MediumContainer from "@/layouts/MediumContainer";
import SuccessAlert from "@/components/SuccessAlert";

export default function Home() {
  const [email, setEmail] = useState('')
  const [emailConfirmation, setEmailConfirmation] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [validationError, setValidationError] = useState<Array<string>>([])
  const [generalError, setGeneralError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const registerBtnClicked = async () => {
    setValidationError([])
    setGeneralError('')
    setSuccessMessage('')
    const res = await fetch('/api/register', {
      method: 'post',
      body: JSON.stringify({
        email: email,
        email_confirmation: emailConfirmation,
        password: password,
        password_confirmation: passwordConfirmation,
      })
    })

    if (res.status === 422 ) {
      const errors: ApiLoginResponse = await res.json()
      setValidationError(errors.errors)
    }

    if (res.status === 400) {
      const json = await res.json()
      setGeneralError(json.error.message)
    }

    if (res.status === 200) {
      setSuccessMessage('You have successfully registered. We have send you an email to verify your email address.')
    }
  }

  return (
    <MediumContainer hasBoarder={true}>
      <div className={"text-center mb-10"}>
        <Logo />
      </div>
      {validationError.length >= 1 &&
      <div className={"w-full"}>
          <ErrorAlert>
              <ul className={"list-disc list-inside"}>
                {validationError.map((item, index) => {
                  return (<li key={index}>{item}</li>)
                })}
              </ul>
          </ErrorAlert>
      </div>
      }
      {generalError &&
        <div className={"w-full"}>
            <ErrorAlert>
                <p>{generalError}</p>
            </ErrorAlert>
        </div>
      }
      {successMessage &&
        <div className={"w-full"}>
            <SuccessAlert>
                <p>{successMessage}</p>
            </SuccessAlert>
        </div>
      }
      <div className={"grid grid-cols1 lg:grid-cols-2 gap-x-4"}>
        <Input
          placeholder={"Email"}
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          isRequired={true}
        />
        <Input
          placeholder={"Email Confirmation"}
          value={emailConfirmation}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmailConfirmation(e.target.value)}
          isRequired={true}
        />
        <Input
          placeholder={"Password"}
          type={InputTypes.password}
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          isRequired={true}
        />
        <Input
          placeholder={"Password Confirmation"}
          type={InputTypes.password}
          value={passwordConfirmation}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPasswordConfirmation(e.target.value)}
          isRequired={true}
        />
      </div>
      <div className={"grid grid-cols-2 gap-4"}>
        <div className={"text-right"}>
          <Btn onClick={registerBtnClicked}>Register</Btn>
        </div>
        <div>
          <Link href={"/"}>
            <a>
              <Btn onClick={() => {}}>Go to login</Btn>
            </a>
          </Link>
        </div>
      </div>
    </MediumContainer>
  )
}
