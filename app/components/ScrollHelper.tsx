"use client"
import React, {useState, useEffect} from 'react'

export function isVisible(ref:any){
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isVisible, setIsVisible] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setIsVisible(entry.isIntersecting)
    );

    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [ref]);
  return isVisible;
}
