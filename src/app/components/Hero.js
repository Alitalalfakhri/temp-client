"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import * as THREE from "three";
import "../styles/hero.css";

const headline = "من خطوط الإنتاج إلى ايدي عملائك.";
const supportingLine = "نصنع التغليف الذي يحمل اسمك بثقة.";
const ringAssets = [
  { assetPath: "/models/chili_house-optimized.glb", scale: 0.9, x: 0.4, y: -0.08, z: 0, floatPhase: 0 },
  { assetPath: "/models/flafl_lebnan-optimized.glb", scale: 1, x: -0.3, y: 0.38, z: -1, floatPhase: 0.8 },
  { assetPath: "/models/abo_abd-optimized.glb", scale: 0.9, x: -0.4, y: -0.2, z: 0, straight: true, floatPhase: 1.6 }
];

function RingScene({ active }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return undefined;
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
    camera.position.set(0, 0, 12);
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: window.devicePixelRatio <= 1.25,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    const group = new THREE.Group();
    scene.add(group);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x18213d, 2.2));
    const keyLight = new THREE.DirectionalLight(0xffe3a0, 3.5);
    keyLight.position.set(-4, 6, 8);
    scene.add(keyLight);
    const animatedObjects = [];
    const clock = new THREE.Clock();

    const getLayout = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const aspect = width / Math.max(height, 1);
      const viewHeight = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
      const viewWidth = viewHeight * aspect;
      const sizeFactor = THREE.MathUtils.clamp(width / 1024, 0.62, 1.1);
      return { viewWidth, viewHeight, sizeFactor };
    };

    const getTarget = (asset) => {
      const { viewWidth, viewHeight } = getLayout();
      return new THREE.Vector3(asset.x * viewWidth, asset.y * viewHeight, asset.z);
    };

    const loaders = ringAssets.filter((asset) => asset.assetPath);
    let disposed = false;
    if (loaders.length) {
      import("three/examples/jsm/loaders/GLTFLoader.js").then(async ({ GLTFLoader }) => {
        const loader = new GLTFLoader();
        for (const [index, asset] of loaders.entries()) {
          if (disposed) return;
          const gltf = await new Promise((resolve, reject) => {
            loader.load(asset.assetPath, resolve, undefined, reject);
          });
          if (disposed) return;

          const target = getTarget(asset);
          const start = target.clone().add(new THREE.Vector3(0, -8, 0));
          const model = gltf.scene;
          model.position.copy(start);
          model.scale.setScalar(asset.scale * getLayout().sizeFactor);
          model.userData = {
            asset,
            target,
            start,
            loadedAt: clock.getElapsedTime(),
            delay: index * 0.14,
            floatPhase: asset.floatPhase ?? index * 0.8,
            straight: asset.straight === true
          };
          model.rotation.set(0, 0, 0);
          animatedObjects.push(model);
          group.add(model);

          await new Promise((resolve) => requestAnimationFrame(resolve));
        }
      }).catch(() => {});
    }

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      const { sizeFactor } = getLayout();
      animatedObjects.forEach((model) => {
        model.userData.target.copy(getTarget(model.userData.asset));
        model.scale.setScalar(model.userData.asset.scale * sizeFactor);
      });
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    let frame;
    const animate = () => {
      const elapsed = clock.getElapsedTime();
      animatedObjects.forEach((ring, index) => {
        const progress = active
          ? THREE.MathUtils.smoothstep(elapsed - ring.userData.loadedAt - ring.userData.delay, 0, 1.5)
          : 0;
        ring.position.lerpVectors(ring.userData.start, ring.userData.target, progress);
        if (active) {
          ring.position.y += Math.sin(elapsed * 0.9 + ring.userData.floatPhase) * 0.08;
        }
        if (!ring.userData.straight) {
          ring.rotation.x = Math.sin(elapsed * 0.7 + ring.userData.floatPhase) * 0.18;
          ring.rotation.y = Math.cos(elapsed * 0.55 + ring.userData.floatPhase) * 0.28;
          ring.rotation.z = Math.sin(elapsed * 0.45 + ring.userData.floatPhase) * 0.08;
        } else {
          ring.rotation.set(0, 0, 0);
        }
      });
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      animatedObjects.forEach((model) => model.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      }));
      renderer.dispose();
    };
  }, [active]);

  return <canvas ref={canvasRef} className="ring-scene" aria-label="نماذج ثلاثية الأبعاد لعلامات العملاء" />;
}

export default function Hero() {
  const [headlineText, setHeadlineText] = useState("");
  const [supportingText, setSupportingText] = useState("");
  const [introStage, setIntroStage] = useState("typing");

  useEffect(() => {
    document.body.classList.add("cinematic-active");
    let headlineIndex = 0;
    let supportIndex = 0;
    let supportTimer;
    let finishTimer;

    let typeHeadline = window.setInterval(() => {
      headlineIndex += 1;
      setHeadlineText(headline.slice(0, headlineIndex));
      if (headlineIndex === headline.length) {
        window.clearInterval(typeHeadline);
        supportTimer = window.setInterval(() => {
          supportIndex += 1;
          setSupportingText(supportingLine.slice(0, supportIndex));
          if (supportIndex === supportingLine.length) {
            window.clearInterval(supportTimer);
            setIntroStage("transitioning");
            finishTimer = window.setTimeout(() => {
              setIntroStage("complete");
              document.body.classList.remove("cinematic-active");
              document.body.classList.add("cinematic-complete");
            }, 900);
          }
        }, 64);
      }
    }, 74);

    return () => {
      window.clearInterval(typeHeadline);
      window.clearInterval(supportTimer);
      window.clearTimeout(finishTimer);
      document.body.classList.remove("cinematic-active", "cinematic-complete");
    };
  }, []);

  return (
    <>
      <div className={`cinematic-intro cinematic-intro--${introStage}`} role="presentation">
        <div className="intro-atmosphere" />
        <div className="intro-copy" dir="rtl">
          <p className="intro-brand">شركة الطيف الذهبي</p>
          <p className="intro-kicker">للطباعة والتغليف</p>
          <h1 className="intro-title"><span>{headlineText}</span><i aria-hidden="true" /></h1>
          <p className="intro-subtitle"><span>{supportingText}</span><i aria-hidden="true" /></p>
          <span className="intro-rule" />
          <div className="hero-actions intro-actions">
            <Link href="/products" className="hero-primary">
              استعرض منتجاتنا <ArrowLeft size={17} />
            </Link>
            <Link href="/contact" className="hero-secondary">
              تواصل معنا
            </Link>
          </div>
        </div>
        {introStage !== "typing" && <RingScene active />}
      </div>

      <section className="hero" aria-hidden="true" />
    </>
  );
}

