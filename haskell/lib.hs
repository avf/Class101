module Communication (sendMessage) where

import Data.Text (Text)
import qualified Network.WebSockets as WS

portNumber = 8000 :: Int

sendMessageApp :: Text -> WS.ServerApp
sendMessageApp msg pending = do
    putStrLn "Connected to app."
    conn <- WS.acceptRequest pending
    WS.sendTextData conn msg
    putStrLn "Message sent."

startServer :: WS.ServerApp -> IO ()
startServer app = do
    putStrLn "Waiting to connect..."
    WS.runServer "127.0.0.1" portNumber app

sendMessage :: Text -> IO ()
sendMessage = startServer . sendMessageApp
