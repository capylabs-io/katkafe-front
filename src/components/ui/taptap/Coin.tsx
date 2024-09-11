import React, { forwardRef, useImperativeHandle, useState } from 'react'

// const getRandomDirection = () => {
//   const angle = Math.random() * Math.PI; // Random angle between 0 and π radians (0 to 180 degrees)
//   const distance = Math.random() * 200 + 100; // Random distance between 100 and 300 pixels
//   const amplitude = Math.random() * 50 + 50; // Amplitude of oscillation
//   const frequency = Math.random() * 0.5 + 0.5; // Frequency of oscillation
//   const controlPointAngle = angle + Math.PI / 4; // Control point angle shifted for smoother curve
//   const controlPointDistance = distance / 2; // Control point closer than end point
//   return {
//     x: Math.cos(angle) * distance,
//     y: Math.abs(Math.sin(angle)) * distance + amplitude * Math.sin(frequency * angle), // Smooth oscillation in y direction
//     controlX: Math.cos(controlPointAngle) * controlPointDistance,
//     controlY: Math.abs(Math.sin(controlPointAngle)) * controlPointDistance,
//   };
// };
// type Props = {
//   postionX: number
//   postionY: number
// }

// export const Coin = forwardRef(({ postionX, postionY }: Props, ref) => {
//   const [direction, setDirection] = useState({ x: 0, y: 0, controlX: 0, controlY: 0 });

//   useImperativeHandle(ref, () => ({
//     handleClick,
//   }));
//   const handleClick = () => {
//     const randomDirection = getRandomDirection();
//     setDirection(randomDirection);
//   };
//   return (
//     <div
//       onClick={handleClick}
//       className={`coin w-16 h-16 flex items-center justify-center cursor-pointer`}
//       style={{
//         left: `${postionX}`,
//         top: `${postionY}`,
//         animation: 'flyout 1s forwards',
//         transform: `translate(${direction.x}px, ${direction.y}px)`
//       }}
//     >
//       <style>
//         {`
//           @keyframes flyout {
//             0% {
//               transform: translate(0, 0);
//               opacity: 100;
//               display: block;
//             }
//             50% {
//               transform: translate(${direction.controlX}px, ${direction.controlY}px);
//               opacity: 50;
//             }
//             80% {
//               transform: translate(${direction.x}px, ${direction.y}px);
//               opacity: 0;
//             }
//             100% {
//               transform: translate(0px, 0px);
//               opacity: 0;
//               display: hidden;
//             }
//           }
//         `}
//       </style>
//       💰
//     </div >
//   )
// })
