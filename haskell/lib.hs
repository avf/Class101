module Communication (sendMessage) where

import           Network.WebSockets as WS
import qualified Network.Socket     as Socket
import           Network.Socket     (Socket, socket, withSocketsDo,
                                     setSocketOption)
import           Control.Exception  (bracket)
import           Data.Text

host = "127.0.0.1"  :: String
port = 8000         :: Int

type SockApp = Socket -> IO ()

runSocketApp :: SockApp -> IO ()
runSocketApp sockApp = withSocketsDo $ do
    addr <- resolve host port
    bracket (sockOpen addr) Socket.close sockApp
  where
    resolve host port = do
      let hints = Socket.defaultHints { Socket.addrSocketType = Socket.Stream }
      host:_ <- Socket.getAddrInfo (Just hints) (Just host) (Just $ show port)
      return host

    sockOpen addr = do
      sock <- socket (Socket.addrFamily addr)
                     (Socket.addrSocketType addr)
                     (Socket.addrProtocol addr)
      setSocketOption sock Socket.ReuseAddr 1
      Socket.bind sock (Socket.addrAddress addr)
      Socket.listen sock 1
      return sock

sendMessageApp :: String -> SockApp
sendMessageApp msg sock = do
    putStrLn "Waiting for connection..."
    (conn', _) <- Socket.accept sock
    putStrLn "Connexion received."
    pending <- WS.makePendingConnection conn' WS.defaultConnectionOptions
    conn <- WS.acceptRequest pending
    putStrLn "Connexion accepted."
    WS.sendTextData conn (pack msg)
    putStrLn "Message sent."

sendMessage :: String -> IO ()
sendMessage = runSocketApp . sendMessageApp
