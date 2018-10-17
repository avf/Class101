import Communication (sendMessage)
import System.Environment

main :: IO ()
main = unwords <$> getArgs >>= sendMessage
