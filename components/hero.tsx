"use client";

import { useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Environment,
  ContactShadows,
  Html,
} from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { SafeMotion } from "@/components/safe-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
useGLTF.preload("shoe.glb");

function ShoeModel({ url = "shoe.glb", ...props }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} {...props} />;
}

function LoadingShoe() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 text-primary animate-spin mb-2" />
        <p className="text-sm text-muted-foreground">Đang tải mô hình 3D...</p>
      </div>
    </Html>
  );
}

const ShoeCanvas = () => {
  const [modelLoaded, setModelLoaded] = useState(false);
  const [modelError, setModelError] = useState(false);

  const handleModelLoad = () => {
    setModelLoaded(true);
    setModelError(false);
  };

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-white">
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 35 }}
        className="w-full h-full"
        onCreated={() => console.log("Canvas created")}
      >
        <ambientLight intensity={0.7} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
          castShadow
        />
        <Environment preset="city" />
        <ContactShadows
          position={[0, -0.8, 0]}
          opacity={0.25}
          scale={10}
          blur={1.5}
          far={0.8}
        />

        <Suspense fallback={<LoadingShoe />}>
          <ShoeModel
            url="shoe.glb"
            position={[0.3, 0, 0]}
            rotation={[0, Math.PI / 4, 0]}
            scale={0.15}
            onLoad={handleModelLoad}
          />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>

      {modelError && (
        <div className="absolute bottom-4 left-0 right-0 text-center px-4 py-2 bg-background/80 backdrop-blur-sm">
          <p className="text-sm text-muted-foreground">
            Vui lòng tải lên file <strong>shoe.glb</strong> vào thư mục{" "}
            <code>public</code>
          </p>
        </div>
      )}
    </div>
  );
};

const bannerImage = [
  "https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_1946,c_limit/f5654862-ef4d-4f10-85f7-7c11f1fe1f8f/nike-just-do-it.png",
  "http://bizweb.dktcdn.net/100/140/774/themes/827866/assets/slider_1.jpg?1746369874066",
  "http://bizweb.dktcdn.net/100/140/774/themes/827866/assets/slider_3.jpg?1746369874066",
  "https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_1920,w_1920/5756941_Masthead_DT_2880x1280_dcc0114fd9.jpg",
];

const bannerAds = [
  "🎉 Miễn phí vận chuyển toàn quốc cho đơn hàng từ 1.000.000₫! 🎉",
  "🔥 Sản phâm mới đã về! Khám phá ngay bộ sưu tập giày thể thao 2025!",
  "👟 Mua 1 tặng 1 cho các mẫu giày seanker! Chỉ trong tuần này!",
  "💥 Giảm giá 20% cho đơn hàng đầu tiên! Sử dụng mã: WELCOME20",
];

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false);
  const [bannerIndex, setBannerIndex] = useState(0);
  const [bannerADSindex, setBannerADIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Tự động chuyển ảnh banner
  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % bannerImage.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerADIndex((prev) => (prev + 1) % bannerAds.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      {/* Banner quảng cáo */}
      <div className="w-full bg-gradient-to-r from-primary to-pink-500 text-white text-center py-3 font-semibold text-lg shadow">
        <p>{bannerAds[bannerADSindex]}</p>
      </div>
      <section className="relative w-full min-h-[90vh] overflow-hidden bg-white">
        <div className="container grid lg:grid-cols-2 gap-8 py-12 md:py-24 items-center">
          <SafeMotion
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6 pt-8 md:pt-0"
          >
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
              Bộ sưu tập mới 2025
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Nâng tầm phong cách <br />
              <span className="text-primary">Vượt mọi giới hạn</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Khám phá bộ sưu tập giày thể thao mới nhất với công nghệ tiên
              tiến, thiết kế hiện đại và sự thoải mái vượt trội.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button
                asChild
                size="lg"
                variant="destructive"
                className="gap-2 w-full sm:w-auto"
              >
                <Link href="/products">
                  Mua ngay <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Khám phá bộ sưu tập
              </Button>
            </div>
            <div className="flex items-center gap-4 md:gap-6 mt-8">
              <div className="flex flex-col">
                <span className="text-3xl font-bold">500+</span>
                <span className="text-muted-foreground">Mẫu giày</span>
              </div>
              <div className="h-12 w-px bg-border"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold">100+</span>
                <span className="text-muted-foreground">Thương hiệu</span>
              </div>
              <div className="h-12 w-px bg-border"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold">50k+</span>
                <span className="text-muted-foreground">Khách hàng</span>
              </div>
            </div>
          </SafeMotion>

          <SafeMotion
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative h-[300px] md:h-[500px] w-full"
          >
            {isMounted && <ShoeCanvas />}
            <div className="absolute -bottom-10 -left-10 -right-10 h-20 bg-gradient-to-t from-background to-transparent z-10" />
          </SafeMotion>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />

        {/* Banner hình ảnh */}
        <div
          className="w-full cursor-pointer"
          onClick={() => router.push("/products")}
        >
          <img
            src={bannerImage[bannerIndex]}
            alt="Banner khuyến mãi"
            className="w-full h-[400px] md:h-[600px] object-cover object-center"
          />
        </div>
      </section>
    </>
  );
}
