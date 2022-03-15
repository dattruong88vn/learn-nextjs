import React from "react"
import useSWR from "swr"

interface StudentDetailProps {
  studentId: string
}

const MS_PER_HOUR = 60 * 60 * 1000

export function StudentDetail({ studentId }: StudentDetailProps) {
  console.warn("Render {StudentDetail}")
  // sử dụng useSWR nhiều chỗ với same key thì vẫn call api 1 lần
  // thời gian mặc đinh revalidate là 2000, sau 2s sẽ revalide
  const { data, error, mutate, isValidating } = useSWR(`students/${studentId}`, {
    revalidateOnFocus: false,
    dedupingInterval: 2000,
  })

  const handleMutateClick = () => {
    // function mutate: thay đổi giá trị của data, tham số thứ 2 là revalidate (true sẽ fetch lại data mới)
    mutate({ name: "thanhdat" }, false)
  }

  return (
    <div>
      Name: {data?.name || "--"} <button onClick={handleMutateClick}>Mutate</button>
    </div>
  )
}
