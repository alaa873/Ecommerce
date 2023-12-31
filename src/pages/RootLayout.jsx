import { Outlet } from 'react-router-dom'
import NaveBar from '../utils/NaveBar'
import Footer from '../utils/Footer'
const RootLayout = () => {
    return (
        <div className=' h-screen'>
            <NaveBar />

            {/* <div className=''>
                <Outlet></Outlet>
            </div> */}
            <div className=' w-full min-h-[610px] sm:min-h-[507px]  md:min-h-[475px] lg:min-h-[460px] left-0'>
                <Outlet></Outlet>
            </div>
            <Footer />

        </div>
    )
}

export default RootLayout 