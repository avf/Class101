{-# LANGUAGE OverloadedStrings #-}

module SDL2Window (sdl2GreetingWindow, sdl2Window) where

import qualified SDL
import SDL           (($=))
import Linear        (V4(..))
import Control.Monad (unless)
import qualified Common as C

sdl2Window :: IO ()
sdl2Window = do
  window <- SDL.createWindow "Class 101" SDL.defaultWindow
  renderer <- SDL.createRenderer window (-1) SDL.defaultRenderer
  appLoop renderer


appLoop :: SDL.Renderer -> IO ()
appLoop renderer = do
  SDL.initializeAll
  events <- SDL.pollEvents
  let eventIsQPress event = case SDL.eventPayload event of
        SDL.KeyboardEvent keyboardEvent ->
          SDL.keyboardEventKeyMotion keyboardEvent == SDL.Pressed &&
          SDL.keysymKeycode (SDL.keyboardEventKeysym keyboardEvent) == SDL.KeycodeQ
        _                               -> False
      qPressed = any eventIsQPress events
  SDL.rendererDrawColor renderer $= SDL.V4 0 0 255 255
  SDL.clear renderer
  SDL.present renderer
  unless qPressed (appLoop renderer)

sdl2GreetingWindow :: IO ()
sdl2GreetingWindow = C.withSDL $ C.withWindow "SDL2 Window" (640, 480) $
                     \w -> do
                       screen <- SDL.getWindowSurface w
                       -- pixelFormat <- SDL.surfaceFormat `applyToPointer` screen
                       -- color <- SDL.mapRGB pixelFormat 0xFF 0xFF 0xFF
                       SDL.surfaceFillRect screen Nothing (SDL.V4 maxBound maxBound maxBound maxBound)
                       SDL.updateWindowSurface w
                       SDL.delay 4000
                       SDL.freeSurface screen
