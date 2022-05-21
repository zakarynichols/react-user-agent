# React User Agent Data

Hook for getting information about the browser and operating system of a user.

```ts
import { useUserAgentData, Hint } from "react-user-agent-data"

const hints: Hint[] = useMemo(
  () => ["architecture", "model", "bitness", "platformVersion", "fullVersionList"],
  []
)

const values = useUserAgentData({ hints: [hints], effectful: true })
```
