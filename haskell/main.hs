import Robocom
import System.Environment
import Control.Monad.Reader

main :: IO ()
main = do
    args <- getArgs
    robot_do $ processCmd args

processCmd :: [String] -> RobotProgram ()
processCmd args =
    case (head args) of
      "left"  -> robot_left 16
      "right" -> robot_right 16
      "up"    -> robot_up 16
      "down"  -> robot_down 16
      "pos"   -> robot_printPosition
      "move"  -> robot_move (read $ args !! 1) (read $ args !! 2)
      "open"  -> robot_openDoor
      "close" -> robot_closeDoor
      _       -> error "Invalid command"
