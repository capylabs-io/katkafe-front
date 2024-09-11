import { useSnackBarStore } from '@/stores/SnackBarStore'
import React, { useEffect } from 'react'
const SnackBar = () => {
  const [content, hideSnackBar] = useSnackBarStore((state) => [
    state.content, state.hide
  ]);
  useEffect(() => {
    setTimeout(() => {
      hideSnackBar()
    }, 2000);
  }, [])

  return (
    <div className="bg-[#000] opacity-70 text-bodyLg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 text-white px-4 py-2 w-max">
      {content}
    </div>
  )
}

export default SnackBar