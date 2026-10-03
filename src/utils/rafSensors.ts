import { TouchSensor, MouseSensor } from '@dnd-kit/core';
import type { TouchSensorOptions, MouseSensorOptions, SensorProps } from '@dnd-kit/core';

/**
 * RAF-Optimized Touch Sensor for @dnd-kit:
 * Encapsulates touchmove DOM and state updates within requestAnimationFrame
 * to align with WebKit display refresh cycles (60Hz / 120Hz ProMotion).
 * Completely eliminates UI jank and main-thread saturation on iOS devices.
 */
export class RafTouchSensor extends TouchSensor {
  static activators = TouchSensor.activators;
  static setup = TouchSensor.setup;

  constructor(props: SensorProps<TouchSensorOptions>) {
    let rafId: number | null = null;
    let pendingCoordinates: { x: number; y: number } | null = null;

    const originalOnMove = props.onMove;
    const originalOnEnd = props.onEnd;
    const originalOnCancel = props.onCancel;

    const wrappedProps: SensorProps<TouchSensorOptions> = {
      ...props,
      onMove: (coordinates) => {
        pendingCoordinates = coordinates;
        if (rafId === null) {
          rafId = requestAnimationFrame(() => {
            if (pendingCoordinates) {
              originalOnMove(pendingCoordinates);
              pendingCoordinates = null;
            }
            rafId = null;
          });
        }
      },
      onEnd: () => {
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
        if (pendingCoordinates) {
          originalOnMove(pendingCoordinates);
          pendingCoordinates = null;
        }
        originalOnEnd();
      },
      onCancel: () => {
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
        pendingCoordinates = null;
        originalOnCancel();
      },
    };

    super(wrappedProps as any);
  }
}

/**
 * RAF-Optimized Mouse Sensor for @dnd-kit:
 * Encapsulates mousemove DOM and state updates within requestAnimationFrame.
 */
export class RafMouseSensor extends MouseSensor {
  static activators = MouseSensor.activators;

  constructor(props: SensorProps<MouseSensorOptions>) {
    let rafId: number | null = null;
    let pendingCoordinates: { x: number; y: number } | null = null;

    const originalOnMove = props.onMove;
    const originalOnEnd = props.onEnd;
    const originalOnCancel = props.onCancel;

    const wrappedProps: SensorProps<MouseSensorOptions> = {
      ...props,
      onMove: (coordinates) => {
        pendingCoordinates = coordinates;
        if (rafId === null) {
          rafId = requestAnimationFrame(() => {
            if (pendingCoordinates) {
              originalOnMove(pendingCoordinates);
              pendingCoordinates = null;
            }
            rafId = null;
          });
        }
      },
      onEnd: () => {
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
        if (pendingCoordinates) {
          originalOnMove(pendingCoordinates);
          pendingCoordinates = null;
        }
        originalOnEnd();
      },
      onCancel: () => {
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
        pendingCoordinates = null;
        originalOnCancel();
      },
    };

    super(wrappedProps as any);
  }
}
