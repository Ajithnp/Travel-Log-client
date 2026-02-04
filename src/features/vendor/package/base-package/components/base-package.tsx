import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"


const BasePackage = () => {
  const navigate = useNavigate();
  return (
    <main>
          <Button onClick={()=> navigate('/vendor/packages/add')}>
              Add Package
      </Button>
    </main>
  )
}

export default BasePackage
