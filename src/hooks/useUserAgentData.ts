import { useEffect, useState } from "react"
import { UADataValues, UALowEntropyJSON } from "../types"

export type Hint = "architecture" | "model" | "bitness" | "platformVersion" | "fullVersionList"

type HighEntropy = "high"
type LowEntropy = "low"

const HIGH_ENTROPY: HighEntropy = "high"
const LOW_ENTROPY: LowEntropy = "low"

type UseUserAgentDataParams<T extends HighEntropy | LowEntropy> = T extends HighEntropy
  ? { entropy: HighEntropy; hints: Hint[] }
  : { entropy: LowEntropy; hints?: Hint[] }

export type UserAgentData<T extends HighEntropy | LowEntropy> = T extends HighEntropy
  ? UADataValues
  : UALowEntropyJSON

export function useUserAgentData(params: { entropy: HighEntropy; hints: Hint[] }): UADataValues
export function useUserAgentData(params: { entropy: LowEntropy }): UALowEntropyJSON

/**
 * Type-safe hook for accessing the current browser and operating system information.
 * @param entropy Amount of information this hook reveals about the browser.
 * @param hints Collection of strongly typed strings hinting to the returned user-agent data.
 * @returns User agent data mapped from the hints argument or an error.
 */
export function useUserAgentData<T extends HighEntropy | LowEntropy>(
  params: UseUserAgentDataParams<T>
): UserAgentData<LowEntropy | HighEntropy> {
  const [userAgentValues, setUserAgentValues] = useState<
    UserAgentData<LowEntropy> | UserAgentData<HighEntropy>
  >({})
  const [error, setError] = useState<null | Error>(null)

  useEffect(() => {
    async function getUserAgentData(): Promise<void> {
      switch (params.entropy) {
        case HIGH_ENTROPY: {
          const data = await getHighEntropyUserAgentData(params.hints)

          if (data instanceof Error) {
            setError(data)
            break
          }

          setUserAgentValues(data)
          break
        }
        case LOW_ENTROPY: {
          const data = getLowEntropyUserAgentData()
          setUserAgentValues(data)
          break
        }
        default: {
          setError(new Error("Malformed parameters."))
          break
        }
      }
    }
    void getUserAgentData()
  }, [params.entropy, params.hints])

  if (error instanceof Error) throw error

  return userAgentValues
}

async function getHighEntropyUserAgentData(hints: Hint[]): Promise<UADataValues | Error> {
  try {
    const agentData = await navigator.userAgentData?.getHighEntropyValues(hints)

    if (agentData === undefined) {
      return new Error("Could not return user-agent data.")
    }

    return agentData
  } catch (err: unknown) {
    if (!(err instanceof Error)) throw new Error("An unexpected error has occurred.")

    if (err.name === "NotAllowedError") {
      return new Error("Permission denied accessing user-agent data.")
    }

    return err
  }
}

function getLowEntropyUserAgentData(): UALowEntropyJSON {
  if (navigator.userAgentData === undefined)
    throw new Error("Client does not have user-agent data.")
  return navigator.userAgentData.toJSON()
}
