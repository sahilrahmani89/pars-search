import React from 'react'

const TextHighLight = (text: string, query: string) => {
    const parts = text.split(new RegExp(`(${query})`, 'gi')); //regex to put condition search item to apply color.
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={i} style={{ color: 'blue' }}>{part}</span>
          ) : (
            part
          )
        )}
      </>
    );
}

export default TextHighLight