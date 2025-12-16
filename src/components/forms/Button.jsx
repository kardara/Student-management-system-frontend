import React from 'react'

export default function Button({ name, onClick, className, loading }) {
  return (
    <button type='button' onClick={onClick} className={'buttonComponent ' + className} >{loading ? (<div className="flex justify-center items-center">
      {/* Dots Loading */}
      <div className="flex space-x-2">
        <div className="w-3 h-3 rounded-full bg-light-bg dark:bg-dark-bg animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-3 h-3 rounded-full bg-light-bg dark:bg-dark-bg animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-3 h-3 rounded-full bg-light-bg dark:bg-dark-bg animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>) : name}</button>
  )
}
