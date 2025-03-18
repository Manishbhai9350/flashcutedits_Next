import React from 'react'

const BasicEditing = () => {
    const router = useRouter();
    const { category } = router.query; // Get the dynamic parameter
  
  return (
    <div>Page</div>
  )
}

export default BasicEditing