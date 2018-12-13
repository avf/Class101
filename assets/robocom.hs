module Robocom ( RobotProgram,

                 robot_do,

                 Position,
                 robot_move,
                 robot_left, robot_down, robot_up, robot_right,
                 robot_getPosition,
                 robot_printPosition,

                 robot_openDoor, robot_closeDoor,
               ) where

import           Network.WebSockets as WS
import qualified Network.Socket     as Socket
import           Network.Socket     (Socket, socket, withSocketsDo,
                                     setSocketOption)
import           Control.Exception  (bracket)
import           Control.Applicative
import           Control.Monad
import           Control.Monad.Reader
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

type RobotProgram a = ReaderT WS.Connection IO a

robot_sockapp :: RobotProgram () -> SockApp
robot_sockapp program sock = do
    putStrLn "Waiting for connection..."
    (conn', _) <- Socket.accept sock
    putStrLn "Connexion received."

    pending <- WS.makePendingConnection conn' WS.defaultConnectionOptions
    conn <- WS.acceptRequest pending
    putStrLn "Connexion accepted."

    runReaderT program conn

    WS.sendTextData conn (pack "CLOSE_CONNECTION")

robot_do :: RobotProgram () -> IO ()
robot_do = runSocketApp . robot_sockapp

robot_recv :: RobotProgram String
robot_recv = do
    conn <- ask
    msg <- lift $ WS.receiveData conn
    return (unpack msg)

robot_cmd :: String -> RobotProgram String
robot_cmd msg = do
    conn <- ask
    lift $ WS.sendTextData conn (pack msg)
    lift $ putStrLn $ "Message sent: " <> msg
    robot_recv

robot_send :: String -> RobotProgram ()
robot_send msg = robot_cmd msg >>= (lift . putStrLn)

type Position = (Int, Int)

robot_move :: Int -> Int -> RobotProgram ()
robot_move dx dy = robot_send $ "move " <> (show dx) <> " " <> (show dy)

robot_getPosition :: RobotProgram Position
robot_getPosition = do
    posFromString <$> robot_cmd "get_position"
        where
            posFromString msg =
                let coords = read <$> Prelude.words msg
                 in (coords !! 0, coords !! 1)

robot_left :: Int -> RobotProgram ()
robot_left dx = robot_move (- dx) 0

robot_right :: Int -> RobotProgram ()
robot_right dx = robot_move dx 0

robot_up :: Int -> RobotProgram ()
robot_up dy = robot_move 0 (- dy)

robot_down :: Int -> RobotProgram ()
robot_down dy = robot_move 0 dy

robot_printPosition :: RobotProgram ()
robot_printPosition = do
    (x, y) <- robot_getPosition
    lift $ putStrLn $ "ROBOT POSITION:\n"
                   <> "\tx: " <> (show x) <> "\n"
                   <> "\ty: " <> (show y)

robot_openDoor :: RobotProgram ()
robot_openDoor = robot_send "open_door"

robot_closeDoor :: RobotProgram ()
robot_closeDoor = robot_send "close_door"
