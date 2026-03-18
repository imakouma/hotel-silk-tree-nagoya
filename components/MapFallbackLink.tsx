"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Android の WebView では Google マップの https が ERR_BLOCKED_BY_RESPONSE で
 * ブロックされるため、Android のときは geo: URI でマップアプリを開く。
 */
const HOTEL_GEO_LAT = 35.1708;
const HOTEL_GEO_LNG = 136.8995;
const HOTEL_ADDRESS = "愛知県名古屋市中区錦2丁目20-5 ホテルシルク・トゥリー名古屋";

function isAndroid(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Android/i.test(navigator.userAgent);
}

type MapFallbackLinkProps = {
  address: string;
  lat?: number;
  lng?: number;
  /** 指定時は「拡大地図」でこのURLへ遷移（Googleマップのplaceページなど） */
  placeUrl?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
};

/** 住所・任意で緯度経度を渡して地図リンクを表示。placeUrl があればそれを優先。Android では geo: でアプリを開く。 */
export function MapFallbackLinkGeneric({
  address,
  lat,
  lng,
  placeUrl,
  className = "mt-2 inline-block text-sm font-medium text-[#304E84] underline underline-offset-2",
  style,
  children,
}: MapFallbackLinkProps) {
  const searchHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  const defaultHref = placeUrl ?? searchHref;
  const [href, setHref] = useState<string>(defaultHref);

  useEffect(() => {
    if (placeUrl) {
      setHref(placeUrl);
      return;
    }
    if (!isAndroid()) return;
    const nextHref =
      lat != null && lng != null
        ? `geo:${lat},${lng}?q=${encodeURIComponent(address)}`
        : `geo:0,0?q=${encodeURIComponent(address)}`;
    const id = setTimeout(() => setHref(nextHref), 0);
    return () => clearTimeout(id);
  }, [address, lat, lng, placeUrl]);

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} style={style}>
      {children}
    </a>
  );
}

/** メインページ用：ホテルシルク・トゥリー名古屋の地図を開くリンク */
export function MapFallbackLink() {
  return (
    <MapFallbackLinkGeneric address={HOTEL_ADDRESS} lat={HOTEL_GEO_LAT} lng={HOTEL_GEO_LNG}>
      地図を開く（Androidで表示されない場合）
    </MapFallbackLinkGeneric>
  );
}
