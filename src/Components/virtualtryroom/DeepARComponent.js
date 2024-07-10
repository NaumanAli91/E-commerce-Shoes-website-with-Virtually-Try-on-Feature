import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setProductId, resetEffect } from '../../features/virtual_try_room_slice';
import * as deepar from 'deepar';

const DeepARComponent = () => {
  const { product_id } = useParams(); // Retrieve product_id from URL
  const dispatch = useDispatch();
  const effectName = useSelector(state => state.virtualproduct.effectName);
  const error = useSelector(state => state.virtualproduct.error);
  const canvasRef = useRef(null);
  const [initialized, setInitialized] = useState(false);
  const deepARRef = useRef(null); // To store the DeepAR instance
  const initializing = useRef(false); // To track the initialization status

  useEffect(() => {
    // Reset the state and dispatch the new product ID
    dispatch(resetEffect());
    dispatch(setProductId(product_id));
  }, [product_id, dispatch]);

  useEffect(() => {
    const initializeDeepAR = async () => {
      if (effectName && !initializing.current) {
        initializing.current = true; // Set initializing to true to prevent reinitialization

        const baseEffectURL = "https://api.dopes.online/";
        const effectURL = baseEffectURL + effectName;

        const canvas = canvasRef.current;
        const scale = window.devicePixelRatio || 1;
        const width = window.innerWidth;
        const height = window.innerHeight;
        canvas.width = Math.floor(width * scale);
        canvas.height = Math.floor(height * scale);

        canvas.style.width = "100vw";
        canvas.style.height = "100vh";

        try {
          if (deepARRef.current) {
            await deepARRef.current.shutdown(); // Shutdown previous instance
            deepARRef.current = null;
          }

          const deepAR = await deepar.initialize({
            licenseKey: 'a59fa6bd8e1784c0617e92826b587ec982dddca3ebe5294fabc9c72845c12bfa890c2f4d6508f49e',
            canvas: canvas,
            effect: effectURL,
            additionalOptions: {
              cameraConfig: {
                facingMode: "environment",
              },
              hint: "footInit",
            }
          });

          deepARRef.current = deepAR; // Store the DeepAR instance

          document.getElementById("loader-wrapper").style.display = "none";

          deepAR.callbacks.onFeetTracked = (leftFoot, rightFoot) => {
            const feetText = document.getElementById("feet-text");
            if (leftFoot.detected || rightFoot.detected) {
              feetText.style.display = "none";
              deepAR.callbacks.onFeetTracked = undefined;
            }
          };

          setInitialized(true);
        } catch (error) {
          console.error('Error initializing DeepAR:', error);
        } finally {
          initializing.current = false; // Reset initializing to false once initialization is complete
        }
      }
    };

    initializeDeepAR();

    // Cleanup function to handle component unmounting or effectName change
    return () => {
      if (deepARRef.current) {
        deepARRef.current.shutdown(); // Shutdown the DeepAR instance
        deepARRef.current = null;
      }
      setInitialized(false);
      initializing.current = false; // Ensure initializing is reset on cleanup
    };
  }, [effectName]);

  return (
    <div>
      {error && <div>No modal of this shoe is found</div>}
      {!error && !initialized && <div id="loader-wrapper">Loading...</div>}
      <canvas id="deepar-canvas" ref={canvasRef} style={{ display: initialized ? 'block' : 'none' }}></canvas>
      <div id="feet-text" style={{ display: initialized ? 'block' : 'none' }}>Feet not detected</div>
    </div>
  );
};

export default DeepARComponent;
