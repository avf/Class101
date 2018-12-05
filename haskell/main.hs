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
      "left"  -> robot_left 15
      "right" -> robot_right 15
      "up"    -> robot_up 15
      "down"  -> robot_down 15
      "pos"   -> robot_showPosition
      "move"  -> robot_move (read $ args !! 1) (read $ args !! 2)
      _       -> error "Invalid command"
