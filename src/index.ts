import { useEffect, useState } from "react"

type Architecture = "architecture"
type Model = "model"
type Bitness = "bitness"
type PlatformVersion = "platformVersion"
type FullVersionList = "fullVersionList"

type Hint = Architecture | Model | Bitness | PlatformVersion | FullVersionList

/**
 * Type-safe hook which gives access to the current browser and operating system.
 *
 * @param hints Array of strongly typed strings hinting to the returned user-agent data.
 * @returns User agent data mapped from the hints argument or an error.
 */
export function useUserAgentData(hints: Hint[]): UADataValues | Error {
  const [info, setInfo] = useState<UADataValues>({})
  const [error, setError] = useState<null | Error>(null)

  useEffect(() => {
    function userAgentData(): void {
      navigator.userAgentData
        ?.getHighEntropyValues(hints)
        .then(info => {
          setInfo(info)
        })
        .catch(err => {
          if (err instanceof Error) {
            setError(err)
          } else {
            setError(new Error("An unexpected error has occurred."))
          }
        })
    }
    userAgentData()
  }, [hints])

  if (error !== null) return error

  return info
}
