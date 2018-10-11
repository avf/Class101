import Communication (sendMessage)
import Data.Text (Text)
import qualified Data.Text as T

main :: IO ()
main = sendMessage $ T.pack "Hello world!"
