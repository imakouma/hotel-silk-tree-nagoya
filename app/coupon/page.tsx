"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage, type LanguageCode } from "@/contexts/LanguageContext";
import { MapFallbackLinkGeneric } from "@/components/MapFallbackLink";

/** バナーは縦の要素が多いため 4:3 で全体が切れずに見える */
const BANNER_ASPECT = "aspect-[4/3]";

/** 参考画像の色（ご夕食クーポン!バナー） */
const HEADER_BG = "#315286";
const COUPON_BG = "#90846c";
/** 本家のクーポン文言色（若干黄色みのクリーム） */
const COUPON_TEXT_COLOR = "#EEE3C4";
const MAP_BTN_BG = "#F5A623";

const COUPON_SITE = "/coupon-page";
const bannerImage = `${COUPON_SITE}/title.png`;
/** 大衆すし酒場 魚喜（クーポン画像） */
const uoyorokobiCouponImage = `${COUPON_SITE}/LINE_ALBUM_シルクトゥリー名古屋_260424_2.jpg`;
const shopImages = [
  uoyorokobiCouponImage, // 大衆すし酒場 魚喜（2枚目カード用）
  `${COUPON_SITE}/439411.jpg`, // 大衆ホルモン・煙力 伏見店（1枚目カード用）
  `${COUPON_SITE}/LINE_ALBUM_シルクトゥリー名古屋_260424_1.jpg`, // おでん 鈴・うなぎ四代目菊川栄店（3枚目カード用）
];

/** モーダル用の店舗詳細画像（MAP押下時に表示）※表示順に合わせて並べ替え */
const shopModalImages: string[][] = [
  [`${COUPON_SITE}/439411.jpg`], // 1番目: 大衆ホルモン・煙力 伏見店
  [uoyorokobiCouponImage], // 2番目: 大衆すし酒場 魚喜
  [`${COUPON_SITE}/LINE_ALBUM_シルクトゥリー名古屋_260424_1.jpg`], // 3番目: おでん 鈴・うなぎ四代目菊川栄店
];


/** クーポンページの多言語翻訳 */
const couponTranslations: Record<
  LanguageCode,
  {
    pageTitle: string;
    backToGuide: string;
    usageMessage: string;
    usageNote: string;
    bringCoupon: string;
    shop1Offer: string;
    shop2Offer1: string;
    shop3Offer: string;
    map: string;
    tel: string;
    showLargerMap: string;
    close: string;
    holidayLabel: string;
    shopModalDescription1: string;
    shopModalDescription2: string;
    shopModalDescription3: string;
    shop1Name: string;
    shop1Hours: string;
    shop1Holiday: string;
    shop1Address: string;
    shop2Name: string;
    shop2Hours: string;
    shop2Holiday: string;
    shop2Address: string;
    shop3Name: string;
    shop3Hours: string;
    shop3Holiday: string;
    shop3Address: string;
  }
> = {
  ja: {
    pageTitle: "飲食店クーポン",
    backToGuide: "館内案内へ戻る",
    usageMessage: "配布のクーポン券を持参、またはこの画面の提示を注文時にスタッフへ渡してください。",
    usageNote: "※利用条件等は配布のクーポン券をご確認ください。",
    bringCoupon: "配布のクーポン券持参または、この画面の提示で",
    shop1Offer: "注文時にスタッフへ提示で おでん盛合わせ（中）半額 または ドリンク1杯人数分無料",
    shop2Offer1:
      "注文時にスタッフへ提示で（当ホテル宿泊者限定）\n指定メニューより ドリンク1杯人数分無料",
    shop3Offer: "日曜・金曜 60分飲み放題500円／水曜・土曜 1杯198円（※お一人様3,000円以上）",
    map: "MAP",
    tel: "TEL",
    showLargerMap: "拡大地図を表示",
    close: "閉じる",
    holidayLabel: "定休日：",
    shopModalDescription1: "配布のクーポン券持参または、この画面の提示で、おでん 鈴では盛合わせ（中）半額など、うなぎ四代目菊川 栄店ではドリンク1杯人数分無料など、各店舗の案内に従ってご利用ください。",
    shopModalDescription2:
      "配布のクーポン券持参またはこの画面の提示で、当ホテル宿泊者限定。注文時にスタッフへお見せいただくと、指定メニューよりドリンク1杯が人数分無料です。チェックアウト当日まで有効。他のクーポン券との併用不可・1組1回1枚。会計時の提示は無効です。",
    shopModalDescription3: "配布のクーポン券持参または、この画面の提示で、日曜・金曜は60分飲み放題500円、水曜・土曜は1杯198円（※お一人様3,000円以上）。",
    shop1Name: "おでん 鈴",
    shop1Hours: "月～金 11:30～14:00／17:30～24:00（L.O.各30分前）　土 16:00～24:00（L.O.23:30）",
    shop1Holiday: "おでん 鈴：日曜・祝日／うなぎ四代目菊川 栄店：火曜",
    shop1Address: "〒460-0003 名古屋市中区錦2丁目20-15（おでん 鈴）",
    shop2Name: "大衆すし酒場　魚喜",
    shop2Hours: "17:00～24:00（L.O.Food 23:00／Drink 23:30）",
    shop2Holiday: "日曜・祝日",
    shop2Address: "〒460-0003 愛知県名古屋市中区錦3丁目20-12 第八錦ビル 1F",
    shop3Name: "大衆ホルモン・煙力 伏見店",
    shop3Hours: "16:00～23:00（L.O.22:30）",
    shop3Holiday: "年中無休（12/31～1/2休業）",
    shop3Address: "〒460-0008 名古屋市中区栄2丁目2-34 蒼園ビル",
  },
  en: {
    pageTitle: "Restaurant Coupon",
    backToGuide: "Back to facility guide",
    usageMessage: "Please bring the coupon ticket provided at check-in and hand it to the staff when ordering.",
    usageNote: "*Please check the distributed coupon for terms and conditions.",
    bringCoupon: "With your coupon ticket",
    shop1Offer: "Half-price oden platter (medium) or 1 free drink per person when you show this to staff when ordering",
    shop2Offer1:
      "Show to staff when ordering (hotel guests only)\n1 free drink per person from the selected menu",
    shop3Offer: "Sun & Fri: 60-min all-you-can-drink ¥500 / Wed & Sat: ¥198 per drink (min. ¥3,000/person)",
    map: "MAP",
    tel: "TEL",
    showLargerMap: "Show larger map",
    close: "Close",
    holidayLabel: "Holiday:",
    shopModalDescription1: "With your coupon or this screen: at Oden Suzu, half-price oden platter (medium), etc.; at Unagi Yondaime Kikukawa Sakae, 1 free drink per person, etc. Offers vary by restaurant—please follow each shop’s instructions.",
    shopModalDescription2:
      "With your coupon or this screen: hotel guests only. Show staff when ordering to receive one free drink per person from the selected menu. Valid until checkout. Cannot be combined with other coupons; one coupon per group per visit. Showing the coupon only at payment is not valid.",
    shopModalDescription3: "With your coupon ticket or by showing this screen: Sun & Fri 60-min all-you-can-drink ¥500; Wed & Sat ¥198 per drink (min. ¥3,000 per person).",
    shop1Name: "Oden Suzu",
    shop1Hours: "Mon–Fri 11:30–14:00 & 17:30–24:00 (L.O. 30 min before close); Sat 16:00–24:00 (L.O. 23:30)",
    shop1Holiday: "Oden Suzu: closed Sun. & holidays / Unagi Yondaime Kikukawa Sakae: closed Tue.",
    shop1Address: "〒460-0003 2-20-15 Nishiki, Naka-ku, Nagoya (Oden Suzu)",
    shop2Name: "UOYOROKOBI (Sushi & Izakaya)",
    shop2Hours: "17:00～24:00 (L.O. Food 23:00 / Drink 23:30)",
    shop2Holiday: "Closed Sun. & holidays",
    shop2Address: "〒460-0003 3-20-12 Nishiki, Naka-ku, Nagoya, Daihachi Nishiki Bldg. 1F",
    shop3Name: "Taishu Horumon Kemuriki Fushimi",
    shop3Hours: "16:00～23:00 (L.O. 22:30)",
    shop3Holiday: "Open all year (Closed Dec 31 - Jan 2)",
    shop3Address: "〒460-0008 2-2-34 Sakae, Naka-ku, Nagoya, Soen Bldg.",
  },
  zh: {
    pageTitle: "餐饮优惠券",
    backToGuide: "返回馆内指南",
    usageMessage: "请务必携带入住时发放的优惠券，点餐时交给工作人员。",
    usageNote: "*使用条件等请参阅所发优惠券。",
    bringCoupon: "持发放的优惠券",
    shop1Offer: "点餐时向店员出示可享御田拼盘（中）半价或每人一杯免费饮料",
    shop2Offer1: "点餐时向店员出示（限本酒店住客）\n指定菜单 饮料每人1杯免费",
    shop3Offer: "周日・周五 60分钟畅饮500日元／周三・周六 每杯198日元（每人消费满3,000日元以上）",
    map: "地图",
    tel: "电话",
    showLargerMap: "显示大地图",
    close: "关闭",
    holidayLabel: "定休日：",
    shopModalDescription1: "持发放的优惠券或出示此画面：在御田铃可享御田拼盘（中）半价等；在鳗鱼四代目菊川荣店可享每人一杯免费饮料等。优惠因店而异，请按各店说明使用。",
    shopModalDescription2:
      "持发放的优惠券或出示本画面，限本酒店住客。点餐时向店员出示可从指定菜单每人获赠饮料1杯。退房当天前有效。不可与其他优惠券同用，每组每次限用1张。仅在结账时出示无效。",
    shopModalDescription3: "持发放的优惠券或出示此画面，周日・周五60分钟畅饮500日元／周三・周六每杯198日元（每人消费满3,000日元以上）。",
    shop1Name: "御田铃",
    shop1Hours: "周一至周五 11:30～14:00／17:30～24:00（各提前30分钟最后点餐）　周六 16:00～24:00（23:30最后点餐）",
    shop1Holiday: "御田铃：周日・节假日休息／鳗鱼四代目菊川荣店：周二休息",
    shop1Address: "〒460-0003 名古屋市中区锦2丁目20-15（御田铃）",
    shop2Name: "大众寿司酒场　鱼喜",
    shop2Hours: "17:00～24:00（餐点最后点餐23:00／饮料23:30）",
    shop2Holiday: "周日・节假日休息",
    shop2Address: "〒460-0003 爱知县名古屋市中区锦3丁目20-12 第八锦大厦 1F",
    shop3Name: "大众ホルモン・烟力 伏见店",
    shop3Hours: "16:00～23:00（最后点餐22:30）",
    shop3Holiday: "全年无休（12/31～1/2休息）",
    shop3Address: "〒460-0008 名古屋市中区荣2丁目2-34 苍园大厦",
  },
  "zh-TW": {
    pageTitle: "餐飲優惠券",
    backToGuide: "返回館內指南",
    usageMessage: "請務必攜帶入住時發放的優惠券，點餐時交給工作人員。",
    usageNote: "*使用條件等請參閱所發優惠券。",
    bringCoupon: "持發放的優惠券",
    shop1Offer: "點餐時向店員出示可享御田拼盤（中）半價或每人一杯免費飲料",
    shop2Offer1: "點餐時向店員出示（限本飯店住客）\n指定菜單 飲料每人1杯免費",
    shop3Offer: "週日・週五 60分鐘暢飲500日圓／週三・週六 每杯198日圓（每人消費滿3,000日圓以上）",
    map: "地圖",
    tel: "電話",
    showLargerMap: "顯示大地圖",
    close: "關閉",
    holidayLabel: "定休日：",
    shopModalDescription1: "持發放的優惠券或出示此畫面：在御田鈴可享御田拼盤（中）半價等；在鰻魚四代目菊川榮店可享每人一杯免費飲料等。優惠依店鋪而異，請依各店說明使用。",
    shopModalDescription2:
      "持發放的優惠券或出示本畫面，限本飯店住客。點餐時向店員出示可從指定菜單每人獲贈飲料1杯。退房當天前有效。不可與其他優惠券同用，每組每次限用1張。僅在結帳時出示無效。",
    shopModalDescription3: "持發放的優惠券或出示此畫面，週日・週五60分鐘暢飲500日圓／週三・週六每杯198日圓（每人消費滿3,000日圓以上）。",
    shop1Name: "御田鈴",
    shop1Hours: "週一至週五 11:30～14:00／17:30～24:00（各提前30分鐘最後點餐）　週六 16:00～24:00（23:30最後點餐）",
    shop1Holiday: "御田鈴：週日・節假日休息／鰻魚四代目菊川榮店：週二休息",
    shop1Address: "〒460-0003 名古屋市中區錦2丁目20-15（御田鈴）",
    shop2Name: "大眾壽司酒場　魚喜",
    shop2Hours: "17:00～24:00（餐點最後點餐23:00／飲料23:30）",
    shop2Holiday: "週日・節假日休息",
    shop2Address: "〒460-0003 愛知縣名古屋市中區錦3丁目20-12 第八錦大廈 1F",
    shop3Name: "大眾ホルモン・煙力 伏見店",
    shop3Hours: "16:00～23:00（最後點餐22:30）",
    shop3Holiday: "全年無休（12/31～1/2休息）",
    shop3Address: "〒460-0008 名古屋市中區榮2丁目2-34 蒼園大廈",
  },
  ko: {
    pageTitle: "식당 쿠폰",
    backToGuide: "시설 안내로 돌아가기",
    usageMessage: "체크인 시 받으신 쿠폰을 꼭 지참하시고 주문 시 스태프에게 전달해 주세요.",
    usageNote: "*이용 조건 등은 배포 쿠폰을 확인해 주세요.",
    bringCoupon: "배포 쿠폰을 지참하시면",
    shop1Offer: "주문 시 스태프에게 제시하면 오뎐 모둠(중) 반값 또는 음료 1인당 1잔 무료",
    shop2Offer1:
      "주문 시 스태프에게 제시（당 호텔 투숙객 한정）\n지정 메뉴에서 음료 1인당 1잔 무료",
    shop3Offer: "일・금 60분 무제한 음료 500엔／수・토 1잔 198엔（1인 3,000엔 이상）",
    map: "지도",
    tel: "TEL",
    showLargerMap: "지도 크게 보기",
    close: "닫기",
    holidayLabel: "정기 휴일:",
    shopModalDescription1: "배포 쿠폰 또는 이 화면 제시 시: 오덴 스즈에서는 오뎐 모둠(중) 반값 등, 우나기 요다이메 키쿠카와 사카에는 음료 1인당 1잔 무료 등. 매장별 안내에 따라 이용해 주세요.",
    shopModalDescription2:
      "배포 쿠폰을 지참하거나 이 화면을 제시하면 당 호텔 투숙객 한정입니다. 주문 시 스태프에게 보여주시면 지정 메뉴에서 음료 1인당 1잔 무료입니다. 체크아웃 당일까지 유효. 다른 쿠폰과 병용 불가·1그룹 1회 1매. 계산 시 제시는 무효입니다.",
    shopModalDescription3: "배포 쿠폰을 지참하거나 이 화면을 제시하면 일・금 60분 무제한 음료 500엔, 수・토 1잔 198엔(1인 3,000엔 이상).",
    shop1Name: "오덴 스즈",
    shop1Hours: "월～금 11:30～14:00／17:30～24:00（각 L.O. 30분 전）　토 16:00～24:00（L.O. 23:30）",
    shop1Holiday: "오덴 스즈: 일・공휴 휴무／우나기 요다이메 키쿠카와 사카에: 화 휴무",
    shop1Address: "〒460-0003 나고야시 나카구 니시키 2초메 20-15（오덴 스즈）",
    shop2Name: "대중스시주점 우오요로코비",
    shop2Hours: "17:00～24:00（음식 마지막 주문 23:00／음료 23:30）",
    shop2Holiday: "일요일・공휴일 휴무",
    shop2Address: "〒460-0003 아이치현 나고야시 나카구 니시키 3정목 20-12 다이하치니시키 빌딩 1F",
    shop3Name: "대중 호르몬・켐리키 후시미점",
    shop3Hours: "16:00～23:00（마지막 주문 22:30）",
    shop3Holiday: "연중 무휴（12/31～1/2 휴업）",
    shop3Address: "〒460-0008 나고야시 나카구 사카에 2정목 2-34 소엔 빌딩",
  },
  fr: {
    pageTitle: "Coupon restaurant",
    backToGuide: "Retour au guide",
    usageMessage: "Veuillez apporter le coupon remis à l'enregistrement et le donner au personnel lors de la commande.",
    usageNote: "*Veuillez consulter le coupon pour les conditions.",
    bringCoupon: "Avec le coupon distribué",
    shop1Offer: "Assiette d'oden (moyenne) à moitié prix ou 1 boisson offerte par personne en présentant au personnel à la commande",
    shop2Offer1:
      "Présentez au personnel à la commande (clients de l'hôtel uniquement)\n1 boisson offerte / pers. depuis la carte sélectionnée",
    shop3Offer: "Dim. & ven. : boissons à volonté 60 min 500 ¥ / Mer. & sam. : 198 ¥/verre (min. 3 000 ¥/pers.)",
    map: "CARTE",
    tel: "TEL",
    showLargerMap: "Agrandir la carte",
    close: "Fermer",
    holidayLabel: "Jours de fermeture :",
    shopModalDescription1: "Avec votre coupon ou en montrant cet écran, présentez-le au personnel à la commande pour 1 boisson offerte.",
    shopModalDescription2:
      "Avec votre coupon ou cet écran : réservé aux clients de l'hôtel. Montrez-le au personnel à la commande pour 1 boisson offerte par personne depuis la carte sélectionnée. Valable jusqu'au jour du départ. Non cumulable ; 1 coupon par groupe et par visite. Non valable si présenté uniquement au paiement.",
    shopModalDescription3: "Avec votre coupon ou en montrant cet écran : dim. et ven. boissons à volonté 60 min 500 ¥ ; mer. et sam. 198 ¥/verre (min. 3 000 ¥/pers.).",
    shop1Name: "Oden Suzu",
    shop1Hours: "Lun–ven 11h30–14h00 & 17h30–24h00 (Dernière commande 30 min avant fermeture) ; sam 16h00–24h00 (Dernière commande 23h30)",
    shop1Holiday: "Oden Suzu : fermé dim. et jours fériés / Unagi Yondaime Kikukawa Sakae : fermé mar.",
    shop1Address: "〒460-0003 2-20-15 Nishiki, Naka-ku, Nagoya (Oden Suzu)",
    shop2Name: "UOYOROKOBI (Sushi & Izakaya)",
    shop2Hours: "17:00～24:00 (Cde nourriture 23:00 / boisson 23:30)",
    shop2Holiday: "Fermé dim. et jours fériés",
    shop2Address: "〒460-0003 3-20-12 Nishiki, Naka-ku, Nagoya, Bât. Daihachi Nishiki 1F",
    shop3Name: "Taishu Horumon Kemuriki Fushimi",
    shop3Hours: "16:00～23:00 (Dernière commande 22:30)",
    shop3Holiday: "Ouvert toute l'année (Fermé 31 déc - 2 jan)",
    shop3Address: "〒460-0008 2-2-34 Sakae, Naka-ku, Nagoya, Bât. Soen",
  },
  de: {
    pageTitle: "Restaurant-Gutschein",
    backToGuide: "Zurück zur Anleitung",
    usageMessage: "Bitte bringen Sie den bei der Anreise ausgehändigten Gutschein mit und übergeben Sie ihn beim Bestellen dem Personal.",
    usageNote: "*Bitte prüfen Sie die Bedingungen auf dem Gutschein.",
    bringCoupon: "Mit dem ausgehändigten Gutschein",
    shop1Offer: "Oden-Platte (mittel) zum halben Preis oder 1 Getränk pro Person gratis bei Vorzeigen bei der Bestellung",
    shop2Offer1:
      "Bei der Bestellung dem Personal zeigen (nur Hotelgäste)\n1 Getränk pro Person gratis aus dem ausgewählten Menü",
    shop3Offer: "So. & Fr.: 60 Min. Flatrate 500 ¥ / Mi. & Sa.: 198 ¥/Glas (min. 3.000 ¥/Pers.)",
    map: "KARTE",
    tel: "TEL",
    showLargerMap: "Karte vergrößern",
    close: "Schließen",
    holidayLabel: "Ruhetag:",
    shopModalDescription1: "Mit Gutschein oder diesem Bildschirm: bei Oden Suzu Oden-Platte (mittel) zum halben Preis u. a.; bei Unagi Yondaime Kikukawa Sakae 1 Getränk pro Person gratis u. a. Angebote je Restaurant unterschiedlich.",
    shopModalDescription2:
      "Mit Gutschein oder diesem Bildschirm: nur für Hotelgäste. Bei der Bestellung dem Personal zeigen für 1 gratis Getränk pro Person aus dem ausgewählten Menü. Gültig bis zum Check-out. Nicht mit anderen Coupons kombinierbar; 1 Coupon pro Gruppe und Besuch. Nur beim Bezahlen zeigen ist ungültig.",
    shopModalDescription3: "Mit Ihrem Gutschein oder durch Zeigen dieses Bildschirms: So. & Fr. 60 Min. Flatrate 500 ¥; Mi. & Sa. 198 ¥/Glas (min. 3.000 ¥/Pers.).",
    shop1Name: "Oden Suzu",
    shop1Hours: "Mo–Fr 11:30–14:00 & 17:30–24:00 (Letzte Best. je 30 Min. vor Schluss); Sa 16:00–24:00 (Letzte Best. 23:30)",
    shop1Holiday: "Oden Suzu: So. & Feiertage geschlossen / Unagi Yondaime Kikukawa Sakae: Di. geschlossen",
    shop1Address: "〒460-0003 2-20-15 Nishiki, Naka-ku, Nagoya (Oden Suzu)",
    shop2Name: "UOYOROKOBI (Sushi & Izakaya)",
    shop2Hours: "17:00～24:00 (Essen 23:00 / Getränke 23:30)",
    shop2Holiday: "So. & Feiertage geschlossen",
    shop2Address: "〒460-0003 3-20-12 Nishiki, Naka-ku, Nagoya, Daihachi Nishiki 1F",
    shop3Name: "Taishu Horumon Kemuriki Fushimi",
    shop3Hours: "16:00～23:00 (Letzte Bestellung 22:30)",
    shop3Holiday: "Ganzjährig (Geschlossen 31. Dez - 2. Jan)",
    shop3Address: "〒460-0008 2-2-34 Sakae, Naka-ku, Nagoya, Soen-Gebäude",
  },
  es: {
    pageTitle: "Cupón de restaurante",
    backToGuide: "Volver a la guía",
    usageMessage: "Por favor traiga el cupón entregado en el check-in y entréguelo al personal al hacer el pedido.",
    usageNote: "*Consulte el cupón para condiciones.",
    bringCoupon: "Con el cupón distribuido",
    shop1Offer: "Bandeja de oden (mediana) a mitad de precio o 1 bebida gratis por persona al mostrar al personal al pedir",
    shop2Offer1:
      "Muéstrelo al personal al pedir (solo huéspedes del hotel)\n1 bebida gratis por persona del menú seleccionado",
    shop3Offer: "Dom. y vie.: 60 min barra libre 500 ¥ / Mié. y sáb.: 198 ¥/copa (mín. 3.000 ¥/pers.)",
    map: "MAPA",
    tel: "TEL",
    showLargerMap: "Ver mapa más grande",
    close: "Cerrar",
    holidayLabel: "Día de descanso:",
    shopModalDescription1: "Con cupón o esta pantalla: en Oden Suzu, bandeja de oden (mediana) a mitad de precio, etc.; en Unagi Yondaime Kikukawa Sakae, 1 bebida gratis por persona, etc. Las ofertas varían según el local.",
    shopModalDescription2:
      "Con su cupón o esta pantalla: solo huéspedes del hotel. Muéstrelo al personal al pedir para 1 bebida gratis por persona del menú seleccionado. Válido hasta el día del check-out. No acumulable; 1 cupón por grupo y visita. No válido si solo se muestra al pagar.",
    shopModalDescription3: "Con su cupón o mostrando esta pantalla: dom. y vie. barra libre 60 min 500 ¥; mié. y sáb. 198 ¥/copa (mín. 3.000 ¥/pers.).",
    shop1Name: "Oden Suzu",
    shop1Hours: "Lun–vie 11:30–14:00 y 17:30–24:00 (Últ. pedido 30 min antes del cierre); sáb 16:00–24:00 (Últ. pedido 23:30)",
    shop1Holiday: "Oden Suzu: cerrado dom. y festivos / Unagi Yondaime Kikukawa Sakae: cerrado mar.",
    shop1Address: "〒460-0003 2-20-15 Nishiki, Naka-ku, Nagoya (Oden Suzu)",
    shop2Name: "UOYOROKOBI (Sushi e Izakaya)",
    shop2Hours: "17:00～24:00 (Comida 23:00 / Bebida 23:30)",
    shop2Holiday: "Cerrado dom. y festivos",
    shop2Address: "〒460-0003 3-20-12 Nishiki, Naka-ku, Nagoya, Ed. Daihachi Nishiki 1F",
    shop3Name: "Taishu Horumon Kemuriki Fushimi",
    shop3Hours: "16:00～23:00 (Último pedido 22:30)",
    shop3Holiday: "Abierto todo el año (Cerrado 31 dic - 2 ene)",
    shop3Address: "〒460-0008 2-2-34 Sakae, Naka-ku, Nagoya, Ed. Soen",
  },
  it: {
    pageTitle: "Coupon ristorante",
    backToGuide: "Torna alla guida",
    usageMessage: "Porti il coupon fornito al check-in e consegnilo al personale al momento dell'ordine.",
    usageNote: "*Consultare il coupon per i termini.",
    bringCoupon: "Con il coupon distribuito",
    shop1Offer: "Piatto di oden (medio) a metà prezzo o 1 bevanda gratuita a persona mostrando al personale all'ordine",
    shop2Offer1:
      "Mostrate al personale all'ordine (solo ospiti dell'hotel)\n1 bevanda gratis a persona dal menù indicato",
    shop3Offer: "Dom. e ven.: 60 min bevande illimitate 500 ¥ / Mer. e sab.: 198 ¥/bicchiere (min. 3.000 ¥/pers.)",
    map: "MAPA",
    tel: "TEL",
    showLargerMap: "Visualizza mappa più grande",
    close: "Chiudi",
    holidayLabel: "Giorno di chiusura:",
    shopModalDescription1: "Con il coupon o questa schermata: da Oden Suzu, piatto di oden (medio) a metà prezzo, ecc.; da Unagi Yondaime Kikukawa Sakae, 1 bevanda gratuita a persona, ecc. Le offerte variano per locale—seguire le indicazioni del ristorante.",
    shopModalDescription2:
      "Con il coupon o questo schermo: solo ospiti dell'hotel. Mostratelo al personale all'ordine per 1 bevanda gratis a persona dal menù indicato. Valido fino al giorno del check-out. Non cumulabile; 1 coupon per gruppo e visita. Non valido se mostrato solo al pagamento.",
    shopModalDescription3: "Con il tuo coupon o mostrando questo schermo: dom. e ven. bevande illimitate 60 min 500 ¥; mer. e sab. 198 ¥/bicchiere (min. 3.000 ¥/pers.).",
    shop1Name: "Oden Suzu",
    shop1Hours: "Lun–ven 11:30–14:00 e 17:30–24:00 (ultimo ordine 30 min prima della chiusura); sab 16:00–24:00 (ultimo ordine 23:30)",
    shop1Holiday: "Oden Suzu: chiuso dom. e festivi / Unagi Yondaime Kikukawa Sakae: chiuso mar.",
    shop1Address: "〒460-0003 2-20-15 Nishiki, Naka-ku, Nagoya (Oden Suzu)",
    shop2Name: "UOYOROKOBI (Sushi e Izakaya)",
    shop2Hours: "17:00～24:00 (Cibo 23:00 / Bevande 23:30)",
    shop2Holiday: "Chiuso dom. e festivi",
    shop2Address: "〒460-0003 3-20-12 Nishiki, Naka-ku, Nagoya, Ed. Daihachi Nishiki 1F",
    shop3Name: "Taishu Horumon Kemuriki Fushimi",
    shop3Hours: "16:00～23:00 (Ultimo ordine 22:30)",
    shop3Holiday: "Aperto tutto l'anno (Chiuso 31 dic - 2 gen)",
    shop3Address: "〒460-0008 2-2-34 Sakae, Naka-ku, Nagoya, Ed. Soen",
  },
  th: {
    pageTitle: "คูปองร้านอาหาร",
    backToGuide: "กลับไปคู่มือโรงแรม",
    usageMessage: "กรุณานำคูปองที่ได้รับตอนเช็คอินมาและส่งให้พนักงานเมื่อสั่งอาหาร",
    usageNote: "*กรุณาตรวจสอบเงื่อนไขในคูปอง",
    bringCoupon: "นำคูปองที่แจกมา",
    shop1Offer: "แสดงให้พนักงานตอนสั่งอาหาร ชุดโอเด็นกลางครึ่งราคา หรือเครื่องดื่ม 1 แก้วฟรีต่อคน",
    shop2Offer1:
      "แสดงต่อพนักงานเมื่อสั่ง (เฉพาะผู้เข้าพักโรงแรมนี้)\nเครื่องดื่ม 1 แก้วต่อคน ฟรีจากเมนูที่กำหนด",
    shop3Offer: "อาทิตย์・ศุกร์ ดื่มไม่จำกัด 60 นาที 500 เยน / พุธ・เสาร์ 198 เยน/แก้ว (ขั้นต่ำ 3,000 เยน/คน)",
    map: "แผนที่",
    tel: "TEL",
    showLargerMap: "แสดงแผนที่ขนาดใหญ่",
    close: "ปิด",
    holidayLabel: "วันหยุด:",
    shopModalDescription1: "เมื่อใช้คูปองหรือแสดงหน้าจอนี้ ที่ร้านโอเด็น ซูซุ ชุดโอเด็นกลางครึ่งราคา ฯลฯ ที่ร้านอูนากิโยไดเมะคิคุคาวะซากาเอะ เครื่องดื่ม 1 แก้วฟรีต่อคน ฯลฯ โปรโมชันต่างกันไปตามร้าน—ปฏิบัติตามคำแนะของแต่ละร้าน",
    shopModalDescription2:
      "นำคูปองมาหรือแสดงหน้าจอนี้ เฉพาะผู้เข้าพักโรงแรมนี้ แสดงต่อพนักงานเมื่อสั่งอาหารเพื่อรับเครื่องดื่ม 1 แก้วต่อคนฟรีจากเมนูที่กำหนด ใช้ได้จนถึงวันเช็คเอาท์ ใช้ร่วมกับคูปองอื่นไม่ได้ 1 กลุ่ม 1 ครั้ง 1 ใบ แสดงตอนชำระเงินอย่างเดียวไม่ได้รับสิทธิ์",
    shopModalDescription3: "นำคูปองมาหรือแสดงหน้าจอนี้ อาทิตย์・ศุกร์ ดื่มไม่จำกัด 60 นาที 500 เยน / พุธ・เสาร์ 198 เยน/แก้ว (ขั้นต่ำ 3,000 เยน/คน)",
    shop1Name: "โอเด็น ซูซุ",
    shop1Hours: "จันทร์–ศุกร์ 11:30–14:00 และ 17:30–24:00 (สั่งล่วงหน้า 30 นาทีก่อนปิด); เสาร์ 16:00–24:00 (สั่งล่วงหน้า 23:30)",
    shop1Holiday: "โอเด็น ซูซุ: ปิดวันอาทิตย์และวันหยุดนักขัตฤกษ์ / อูนากิโยไดเมะคิคุคาวะซากาเอะ: ปิดวันอังคาร",
    shop1Address: "〒460-0003 2-20-15 นิชิกิ นากะ-คุ นาโงยะ (โอเด็น ซูซุ)",
    shop2Name: "ยูโยโยโคบิ (ซูชิและอิซากายะ)",
    shop2Hours: "17:00～24:00 (สั่งสุดท้าย อาหาร 23:00 / เครื่องดื่ม 23:30)",
    shop2Holiday: "ปิดวันอาทิตย์และวันหยุดนักขัตฤกษ์",
    shop2Address: "〒460-0003 3-20-12 นิชิกิ นากะ-คุ นาโงยะ อาคารไดฮาจิ นิชิกิ 1F",
    shop3Name: "ยามิตสึกิ โฮรุมง ริคิว โอโดริ",
    shop3Hours: "16:00～23:00 (สั่งสุดท้าย 22:30)",
    shop3Holiday: "เปิดทุกวัน (ปิด 31 ธ.ค. - 2 ม.ค.)",
    shop3Address: "〒460-0008 2-2-34 ซากาเอะ นากะ-คุ นาโงยะ อาคารโซเอ็น",
  },
  vi: {
    pageTitle: "Phiếu giảm giá nhà hàng",
    backToGuide: "Quay lại hướng dẫn",
    usageMessage: "Vui lòng mang theo phiếu được phát khi nhận phòng và giao cho nhân viên khi gọi món.",
    usageNote: "*Vui lòng xem phiếu để biết điều kiện.",
    bringCoupon: "Mang theo phiếu được phát",
    shop1Offer: "Khi gọi món, xuất trình cho nhân viên: đĩa oden cỡ vừa giảm một nửa hoặc 1 ly nước miễn phí/người",
    shop2Offer1:
      "Xuất trình cho nhân viên khi gọi món (chỉ khách lưu trú khách sạn)\n1 ly nước miễn phí/người trong thực đơn chỉ định",
    shop3Offer: "CN & T6: 60 phút uống thoải mái 500 yên / T4 & T7: 198 yên/ly (tối thiểu 3.000 yên/người)",
    map: "BẢN ĐỒ",
    tel: "TEL",
    showLargerMap: "Hiện bản đồ lớn hơn",
    close: "Đóng",
    holidayLabel: "Ngày nghỉ:",
    shopModalDescription1: "Với phiếu hoặc màn hình này: tại Oden Suzu, đĩa oden cỡ vừa giảm một nửa, v.v.; tại Unagi Yondaime Kikukawa Sakae, 1 ly nước miễn phí/người, v.v. Ưu đãi khác nhau theo nhà hàng—vui lòng làm theo hướng dẫn của từng cửa hàng.",
    shopModalDescription2:
      "Mang phiếu hoặc màn hình này: chỉ khách lưu trú khách sạn. Xuất trình khi gọi món để được 1 ly nước miễn phí/người trong thực đơn chỉ định. Hiệu lực đến ngày trả phòng. Không dùng kèm phiếu khác; 1 phiếu/nhóm/lần. Chỉ xuất trình lúc thanh toán là không hợp lệ.",
    shopModalDescription3: "Mang theo phiếu hoặc hiển thị màn hình này: CN & T6 60 phút uống thoải mái 500 yên; T4 & T7 198 yên/ly (tối thiểu 3.000 yên/người).",
    shop1Name: "Oden Suzu",
    shop1Hours: "T2–T6 11:30–14:00 & 17:30–24:00 (L.O. 30 phút trước giờ đóng); T7 16:00–24:00 (L.O. 23:30)",
    shop1Holiday: "Oden Suzu: đóng CN và ngày lễ / Unagi Yondaime Kikukawa Sakae: đóng thứ Ba",
    shop1Address: "〒460-0003 2-20-15 Nishiki, Naka-ku, Nagoya (Oden Suzu)",
    shop2Name: "UOYOROKOBI (Sushi & Izakaya)",
    shop2Hours: "17:00～24:00 (Đồ ăn 23:00 / Đồ uống 23:30)",
    shop2Holiday: "Đóng CN và ngày lễ",
    shop2Address: "〒460-0003 3-20-12 Nishiki, Naka-ku, Nagoya, Tòa nhà Daihachi Nishiki 1F",
    shop3Name: "Taishu Horumon Kemuriki Fushimi",
    shop3Hours: "16:00～23:00 (Đặt món cuối 22:30)",
    shop3Holiday: "Mở quanh năm (Đóng 31/12 - 2/1)",
    shop3Address: "〒460-0008 2-2-34 Sakae, Naka-ku, Nagoya, Tòa nhà Soen",
  },
  id: {
    pageTitle: "Kupon restoran",
    backToGuide: "Kembali ke panduan",
    usageMessage: "Harap bawa kupon yang diberikan saat check-in dan serahkan ke staf saat memesan.",
    usageNote: "*Silakan periksa kupon untuk syarat dan ketentuan.",
    bringCoupon: "Dengan kupon yang dibagikan",
    shop1Offer: "Tunjukkan ke staf saat memesan: nampan oden (sedang) setengah harga atau 1 minuman gratis per orang",
    shop2Offer1:
      "Tunjukkan ke staf saat memesan (hanya tamu hotel ini)\n1 minuman gratis per orang dari menu yang ditentukan",
    shop3Offer: "Min & Jum: 60 menit minum sepuasnya 500 yen / Rab & Sab: 198 yen/gelas (min. 3.000 yen/orang)",
    map: "PETA",
    tel: "TEL",
    showLargerMap: "Tampilkan peta lebih besar",
    close: "Tutup",
    holidayLabel: "Hari libur:",
    shopModalDescription1: "Dengan kupon atau layar ini: di Oden Suzu, nampan oden (sedang) setengah harga, dll.; di Unagi Yondaime Kikukawa Sakae, 1 minuman gratis per orang, dll. Penawaran berbeda per restoran—ikuti petunjuk masing-masing.",
    shopModalDescription2:
      "Dengan kupon atau layar ini: hanya tamu hotel. Tunjukkan ke staf saat memesan untuk 1 minuman gratis per orang dari menu yang ditentukan. Berlaku hingga hari checkout. Tidak dapat digabung; 1 kupon per grup per kunjungan. Tidak berlaku jika hanya ditunjukkan saat pembayaran.",
    shopModalDescription3: "Dengan kupon Anda atau dengan menampilkan layar ini: Min & Jum 60 menit minum sepuasnya 500 yen; Rab & Sab 198 yen/gelas (min. 3.000 yen/orang).",
    shop1Name: "Oden Suzu",
    shop1Hours: "Sen–Jum 11:30–14:00 & 17:30–24:00 (L.O. 30 menit sebelum tutup); Sab 16:00–24:00 (L.O. 23:30)",
    shop1Holiday: "Oden Suzu: tutup Minggu & hari libur / Unagi Yondaime Kikukawa Sakae: tutup Selasa",
    shop1Address: "〒460-0003 2-20-15 Nishiki, Naka-ku, Nagoya (Oden Suzu)",
    shop2Name: "UOYOROKOBI (Sushi & Izakaya)",
    shop2Hours: "17:00～24:00 (Makanan 23:00 / Minuman 23:30)",
    shop2Holiday: "Tutup Ahad & cuti",
    shop2Address: "〒460-0003 3-20-12 Nishiki, Naka-ku, Nagoya, Bangunan Daihachi Nishiki 1F",
    shop3Name: "Taishu Horumon Kemuriki Fushimi",
    shop3Hours: "16:00～23:00 (Pesanan terakhir 22:30)",
    shop3Holiday: "Buka sepanjang tahun (Tutup 31 Des - 2 Jan)",
    shop3Address: "〒460-0008 2-2-34 Sakae, Naka-ku, Nagoya, Gedung Soen",
  },
  pt: {
    pageTitle: "Cupom de restaurante",
    backToGuide: "Voltar ao guia",
    usageMessage: "Traga o cupom fornecido no check-in e entregue-o à equipe ao fazer o pedido.",
    usageNote: "*Consulte o cupom para condições.",
    bringCoupon: "Com o cupom distribuído",
    shop1Offer: "Bandeja de oden (média) à metade do preço ou 1 bebida grátis por pessoa ao mostrar ao staff ao pedir",
    shop2Offer1:
      "Mostre ao staff ao pedir (apenas hóspedes do hotel)\n1 bebida grátis/pessoa do menu indicado",
    shop3Offer: "Dom. e sex.: 60 min barra livre 500 ¥ / Qua. e sáb.: 198 ¥/copo (mín. 3.000 ¥/pessoa)",
    map: "MAPA",
    tel: "TEL",
    showLargerMap: "Mostrar mapa maior",
    close: "Fechar",
    holidayLabel: "Dia de descanso:",
    shopModalDescription1: "Com seu cupom ou esta tela: no Oden Suzu, bandeja de oden (média) à metade do preço, etc.; no Unagi Yondaime Kikukawa Sakae, 1 bebida grátis por pessoa, etc. As ofertas variam por restaurante—siga as instruções de cada local.",
    shopModalDescription2:
      "Com cupom ou esta tela: apenas hóspedes do hotel. Mostre ao staff ao pedir para 1 bebida grátis/pessoa do menu indicado. Válido até o dia do checkout. Não cumulável; 1 cupom por grupo e visita. Inválido se mostrado só no pagamento.",
    shopModalDescription3: "Com seu cupom ou mostrando esta tela: dom. e sex. 60 min barra livre 500 ¥; qua. e sáb. 198 ¥/copo (mín. 3.000 ¥/pessoa).",
    shop1Name: "Oden Suzu",
    shop1Hours: "Seg–Sex 11:30–14:00 e 17:30–24:00 (L.O. 30 min antes do fecho); Sáb 16:00–24:00 (L.O. 23:30)",
    shop1Holiday: "Oden Suzu: fechado dom. e feriados / Unagi Yondaime Kikukawa Sakae: fechado terça",
    shop1Address: "〒460-0003 2-20-15 Nishiki, Naka-ku, Nagoya (Oden Suzu)",
    shop2Name: "UOYOROKOBI (Sushi & Izakaya)",
    shop2Hours: "17:00～24:00 (Comida 23:00 / Bebida 23:30)",
    shop2Holiday: "Fechado dom. e feriados",
    shop2Address: "〒460-0003 3-20-12 Nishiki, Naka-ku, Nagoya, Ed. Daihachi Nishiki 1F",
    shop3Name: "Taishu Horumon Kemuriki Fushimi",
    shop3Hours: "16:00～23:00 (Último pedido 22:30)",
    shop3Holiday: "Aberto o ano todo (Fechado 31 dez - 2 jan)",
    shop3Address: "〒460-0008 2-2-34 Sakae, Naka-ku, Nagoya, Ed. Soen",
  },
  tl: {
    pageTitle: "Coupon ng restaurant",
    backToGuide: "Bumalik sa gabay",
    usageMessage: "Mangyaring dalhin ang coupon na ibinigay sa check-in at ibigay sa staff kapag umorder.",
    usageNote: "*Mangyaring tingnan ang coupon para sa mga tuntunin.",
    bringCoupon: "Sa distributed coupon",
    shop1Offer: "Ipakita sa staff sa pag-order: kalahating presyo ang medium oden platter o 1 libreng inumin bawat tao",
    shop2Offer1:
      "Ipakita sa staff kapag umorder (hotel guests lamang)\n1 inumin libre bawat tao mula sa tinakdang menu",
    shop3Offer: "Linggo at Biy.: 60 min all-you-can-drink ¥500 / Miy. at Sab.: ¥198/baso (min. ¥3,000/tao)",
    map: "MAPA",
    tel: "TEL",
    showLargerMap: "Ipakita ang mas malaking mapa",
    close: "Isara",
    holidayLabel: "Araw ng pahinga:",
    shopModalDescription1: "Sa iyong coupon o screen na ito: sa Oden Suzu, half price na medium oden platter, atbp.; sa Unagi Yondaime Kikukawa Sakae, 1 libreng inumin bawat tao, atbp. Mag-iiba ang promo bawat restoran—sundin ang tagubilin ng bawat tindahan.",
    shopModalDescription2:
      "Sa coupon o screen na ito: hotel guests lamang. Ipakita sa staff kapag umorder para sa 1 inumin libre bawat tao mula sa tinakdang menu. Valid hanggang checkout. Hindi puwedeng pagsamahin; 1 coupon kada grupo kada bisita. Hindi valid kung ipapakita lang sa bayad.",
    shopModalDescription3: "Sa iyong coupon o sa pagpapakita ng screen na ito: Linggo at Biy. 60 min all-you-can-drink ¥500; Miy. at Sab. ¥198/baso (min. ¥3,000/tao).",
    shop1Name: "Oden Suzu",
    shop1Hours: "Lun–Biy 11:30–14:00 at 17:30–24:00 (L.O. 30 min bago magsara); Sab 16:00–24:00 (L.O. 23:30)",
    shop1Holiday: "Oden Suzu: sarado Linggo at holidays / Unagi Yondaime Kikukawa Sakae: sarado Martes",
    shop1Address: "〒460-0003 2-20-15 Nishiki, Naka-ku, Nagoya (Oden Suzu)",
    shop2Name: "UOYOROKOBI (Sushi & Izakaya)",
    shop2Hours: "17:00～24:00 (Pagkain 23:00 / Inumin 23:30)",
    shop2Holiday: "Sarado Linggo at holidays",
    shop2Address: "〒460-0003 3-20-12 Nishiki, Naka-ku, Nagoya, Gusali Daihachi Nishiki 1F",
    shop3Name: "Taishu Horumon Kemuriki Fushimi",
    shop3Hours: "16:00～23:00 (Huling order 22:30)",
    shop3Holiday: "Bukas buong taon (Sarado Dis 31 - Ene 2)",
    shop3Address: "〒460-0008 2-2-34 Sakae, Naka-ku, Nagoya, Gusali Soen",
  },
  ms: {
    pageTitle: "Kupon restoran",
    backToGuide: "Kembali ke panduan",
    usageMessage: "Sila bawa kupon yang diberikan semasa daftar masuk dan serahkan kepada kakitangan ketika membuat pesanan.",
    usageNote: "*Sila rujuk kupon untuk syarat.",
    bringCoupon: "Dengan kupon yang diedarkan",
    shop1Offer: "Tunjukkan kepada kakitangan semasa memesan: dulang oden (sederhana) separuh harga atau 1 minuman percuma seorang",
    shop2Offer1:
      "Tunjukkan kepada kakitangan semasa memesan (tetamu hotel sahaja)\n1 minuman percuma seorang daripada menu terpilih",
    shop3Offer: "Ahad & Jumaat: 60 min minum tanpa had 500 yen / Rabu & Sabtu: 198 yen/gelas (min. 3,000 yen/orang)",
    map: "PETA",
    tel: "TEL",
    showLargerMap: "Tunjukkan peta lebih besar",
    close: "Tutup",
    holidayLabel: "Hari cuti:",
    shopModalDescription1: "Dengan kupon atau skrin ini: di Oden Suzu, dulang oden (sederhana) separuh harga, dll.; di Unagi Yondaime Kikukawa Sakae, 1 minuman percuma seorang, dll. Tawaran berbeza mengikut restoran—ikut arahan setiap premis.",
    shopModalDescription2:
      "Dengan kupon atau skrin ini: tetamu hotel sahaja. Tunjukkan kepada kakitangan semasa memesan untuk 1 minuman percuma seorang daripada menu terpilih. Sah sehingga hari daftar keluar. Tidak boleh digabung; 1 kupon sekumpulan sekali lawatan. Tidak sah jika ditunjukkan semasa bayaran sahaja.",
    shopModalDescription3: "Dengan kupon anda atau dengan menunjukkan skrin ini: Ahad & Jumaat 60 min minum tanpa had 500 yen; Rabu & Sabtu 198 yen/gelas (min. 3,000 yen/orang).",
    shop1Name: "Oden Suzu",
    shop1Hours: "Isnin–Jumaat 11:30–14:00 & 17:30–24:00 (L.O. 30 min sebelum tutup); Sabtu 16:00–24:00 (L.O. 23:30)",
    shop1Holiday: "Oden Suzu: tutup Ahad & cuti / Unagi Yondaime Kikukawa Sakae: tutup Selasa",
    shop1Address: "〒460-0003 2-20-15 Nishiki, Naka-ku, Nagoya (Oden Suzu)",
    shop2Name: "UOYOROKOBI (Sushi & Izakaya)",
    shop2Hours: "17:00～24:00 (Makanan 23:00 / Minuman 23:30)",
    shop2Holiday: "Tutup Ahad & cuti",
    shop2Address: "〒460-0003 3-20-12 Nishiki, Naka-ku, Nagoya, Bangunan Daihachi Nishiki 1F",
    shop3Name: "Taishu Horumon Kemuriki Fushimi",
    shop3Hours: "16:00～23:00 (Pesanan terakhir 22:30)",
    shop3Holiday: "Buka sepanjang tahun (Tutup 31 Dis - 2 Jan)",
    shop3Address: "〒460-0008 2-2-34 Sakae, Naka-ku, Nagoya, Bangunan Soen",
  },
};

function getCouponT(lang: LanguageCode) {
  const base = couponTranslations.en as Record<string, unknown>;
  const selected = (couponTranslations as Record<string, Record<string, unknown> | undefined>)[lang] ?? {};
  const merged: Record<string, unknown> = { ...base, ...selected };

  for (const key of Object.keys(base)) {
    const val = selected[key];
    if (typeof val === "string" && val.trim() === "") {
      merged[key] = base[key];
    }
  }

  return merged as typeof couponTranslations.en;
}

// 表示順: 1番目＝大衆ホルモン・煙力 伏見店、2番目＝大衆すし酒場 魚喜、3番目＝おでん 鈴＋うなぎ四代目菊川 栄店
const shopsBase = [
  {
    nameKey: "shop3" as const,
    imageSrc: shopImages[1],
    branches: [
      {
        name: "大衆ホルモン・煙力 伏見店",
        address: "〒460-0008 名古屋市中区栄2丁目2-34 蒼園ビル",
        tel: "052-265-7926",
        hours: "16:00～23:00（L.O.22:30）",
        holiday: "年中無休（12/31～1/2休業）",
        lat: 35.169,
        lng: 136.908,
        placeUrl: "https://www.google.com/maps/place/%E7%85%99%E5%8A%9B+%E4%BC%8F%E8%A6%8B%E5%BA%97/@35.1677721,136.8962404,17z/data=!3m1!4b1!4m6!3m5!1s0x600377a721d2919d:0x6810467da0d8b8e6!8m2!3d35.1677721!4d136.8988207!16s%2Fg%2F11n76rw_vt?entry=ttu",
      },
    ],
    hours: "16:00～23:00（L.O.22:30）",
    holiday: "年中無休（12/31～1/2休業）",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=大衆ホルモン+煙力+伏見店+名古屋",
  },
  /* 2枚目: 魚喜用カード */
  {
    nameKey: "shop2" as const,
    imageSrc: shopImages[0],
    branches: [
      {
        name: "大衆すし酒場　魚喜",
        address: "〒460-0003 愛知県名古屋市中区錦3丁目20-12 第八錦ビル 1F",
        tel: "052-953-0940",
        hours: "17:00～24:00（L.O.Food 23:00／Drink 23:30）",
        holiday: "日曜・祝日",
        lat: 35.171,
        lng: 136.899,
        placeUrl: "https://www.google.com/maps/place/%E5%A4%A7%E8%A1%86%E3%81%99%E3%81%97%E9%85%92%E5%A0%B4+%E9%AD%9A%E5%96%9C/@35.1702583,136.9004081,17z/data=!3m2!4b1!5s0x600370d52c877b69:0xeca281ad89821735!4m6!3m5!1s0x600371c116dda56f:0xbee476b1fc12ccf6!8m2!3d35.1702583!4d136.9029884!16s%2Fg%2F11tcsv5420?entry=ttu",
      },
    ],
    hours: "17:00～24:00（L.O.Food 23:00／Drink 23:30）",
    holiday: "日曜・祝日",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=大衆すし酒場+魚喜+名古屋",
  },
  /* 3枚目: おでん 鈴＋うなぎ四代目菊川 栄店（同一カード） */
  {
    nameKey: "shop1" as const,
    imageSrc: shopImages[2],
    branches: [
      {
        name: "おでん 鈴",
        address: "〒460-0003 名古屋市中区錦2丁目20-15",
        tel: "052-972-9998",
        hours: "月～金 11:30～14:00（L.O.13:30）／17:30～24:00（L.O.23:30）\n土 16:00～24:00（L.O.23:30）",
        holiday: "日曜・祝日",
        lat: 35.1705,
        lng: 136.898,
        placeUrl: "https://www.google.com/maps/search/?api=1&query=おでん鈴+名古屋+錦",
      },
      {
        name: "うなぎ四代目菊川栄店",
        address: "〒460-0003 愛知県名古屋市中区錦3丁目24-17 BINO栄 5階",
        tel: "052-962-9991",
        hours: "11:00～15:00（L.O.14:00）／17:00～22:00（L.O.21:00）",
        holiday: "火曜定休",
        lat: 35.1702,
        lng: 136.900,
        placeUrl: "https://www.google.com/maps/search/?api=1&query=うなぎ四代目菊川+栄店+名古屋",
      },
    ],
    hours: "月～金 11:30～14:00／17:30～24:00（土は16:00開店）※店舗により異なります",
    holiday: "おでん 鈴：日・祝休／菊川栄店：火休",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=おでん鈴+名古屋",
  },
];

const mainLanguages: Array<{ code: LanguageCode; flag: string; label: string }> = [
  { code: "en", flag: "🇺🇸", label: "English" },
  { code: "zh", flag: "🇨🇳", label: "中文" },
  { code: "zh-TW", flag: "🇹🇼", label: "繁體中文" },
  { code: "ko", flag: "🇰🇷", label: "한국어" },
  { code: "ja", flag: "🇯🇵", label: "日本語" },
];

const otherLanguages: Array<{ code: LanguageCode; flag: string; label: string }> = [
  { code: "th", flag: "🇹🇭", label: "ไทย" },
  { code: "vi", flag: "🇻🇳", label: "Tiếng Việt" },
  { code: "tl", flag: "🇵🇭", label: "Tagalog" },
  { code: "id", flag: "🇮🇩", label: "Bahasa Indonesia" },
  { code: "ms", flag: "🇲🇾", label: "Bahasa Melayu" },
  { code: "fr", flag: "🇫🇷", label: "Français" },
  { code: "de", flag: "🇩🇪", label: "Deutsch" },
  { code: "es", flag: "🇪🇸", label: "Español" },
  { code: "it", flag: "🇮🇹", label: "Italiano" },
  { code: "pt", flag: "🇵🇹", label: "Português" },
];

export default function CouponPage() {
  const { language: selectedLanguage, setLanguage: setSelectedLanguage } = useLanguage();
  const [showOtherLanguages, setShowOtherLanguages] = useState(false);
  const [openModalShopIndex, setOpenModalShopIndex] = useState<number | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const t = getCouponT(selectedLanguage);

  const openModal = (index: number) => {
    setCurrentSlideIndex(0);
    setOpenModalShopIndex(index);
  };

  const closeModal = () => {
    setCurrentSlideIndex(0);
    setOpenModalShopIndex(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showOtherLanguages &&
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target as Node)
      ) {
        setShowOtherLanguages(false);
      }
    };
    if (showOtherLanguages) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showOtherLanguages]);

  // 全店舗のスライドショー（3秒ごとに自動切り替え）
  useEffect(() => {
    if (openModalShopIndex !== null && (openModalShopIndex === 0 || openModalShopIndex === 1 || openModalShopIndex === 2)) {
      const modalImages = shopModalImages[openModalShopIndex] ?? [];
      if (modalImages.length > 1) {
        const interval = setInterval(() => {
          setCurrentSlideIndex((prev) => (prev + 1) % modalImages.length);
        }, 3000);
        return () => clearInterval(interval);
      }
    }
  }, [openModalShopIndex]);

  return (
    <div className="min-h-screen bg-[#F2EDCF]">
      {/* ヘッダー（タイトル＋言語翻訳機能・館内案内に戻るはバナー左上に配置） */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:px-6">
          <h1 className="min-w-0 shrink text-base font-bold text-gray-900 sm:text-lg">
            {t.pageTitle}
          </h1>
          <div className="flex-1 min-w-0" aria-hidden />
          {/* 言語選択（ホームと同じ） */}
          <div ref={languageDropdownRef} className="flex shrink-0 items-center space-x-0.5 sm:space-x-1 relative flex-nowrap">
            <button
              onClick={() => setShowOtherLanguages(!showOtherLanguages)}
              className={`flex flex-col items-center rounded p-0.5 sm:p-1 transition-colors ${
                showOtherLanguages ? "bg-blue-50" : "hover:bg-gray-50"
              }`}
              title="Other Languages"
            >
              <span className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center text-base sm:text-lg leading-none">🌐</span>
              <span className="mt-0.5 text-[8px] sm:text-[10px] leading-tight text-gray-700">Another</span>
            </button>
            {showOtherLanguages && (
              <div className="absolute top-full right-0 z-50 mt-2 max-h-[60vh] w-[calc(100vw-2rem)] max-w-[calc(100vw-2rem)] overflow-y-auto rounded-lg border border-gray-200 bg-white p-2 shadow-lg sm:max-h-[300px] sm:w-auto sm:max-w-none">
                <div className="grid grid-cols-2 gap-2">
                  {otherLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Language button clicked:', lang.code);
                        setSelectedLanguage(lang.code);
                        setShowOtherLanguages(false);
                      }}
                      className={`flex flex-col items-center rounded p-1.5 sm:p-2 transition-colors ${
                        selectedLanguage === lang.code ? "bg-blue-50" : "hover:bg-gray-50"
                      }`}
                      title={lang.label}
                    >
                      <span className="mb-1 text-base sm:text-lg leading-none">{lang.flag}</span>
                      <span className="text-center text-[10px] sm:text-xs leading-tight text-gray-700">{lang.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {mainLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Language button clicked:', lang.code);
                  setSelectedLanguage(lang.code);
                  setShowOtherLanguages(false);
                }}
                className={`flex flex-col items-center rounded p-0.5 sm:p-1 transition-colors ${
                  selectedLanguage === lang.code ? "bg-blue-50" : "hover:bg-gray-50"
                }`}
                title={lang.label}
              >
                <span className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center text-base sm:text-lg leading-none">{lang.flag}</span>
                <span className="mt-0.5 text-[8px] sm:text-[10px] leading-tight text-gray-700">{lang.label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        {/* メインバナー（ご夕食クーポン!）・スマホでは館内案内に戻るを上に分離、PCでは左上にオーバーレイ */}
        <section className="mb-6 -mx-4 sm:-mx-6 relative">
          {/* スマホ版：館内案内に戻るをバナー上に表示（重なり防止） */}
          <Link
            href="/"
            className="sm:hidden mb-3 flex items-center gap-2 px-1 transition-opacity hover:opacity-90 hover:underline"
            style={{ color: "#304E84" }}
          >
            <svg
              className="h-5 w-5 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M15 3h6v18h-6" />
              <path d="M10 17l5-5-5-5" />
              <path d="M13.8 12H3" />
            </svg>
            <span className="text-sm font-semibold leading-tight">{t.backToGuide}</span>
          </Link>
          <div className={`relative w-full overflow-hidden ${BANNER_ASPECT} max-h-[380px] bg-[#F2EDCF] sm:max-h-[420px]`}>
            <Image
              src={encodeURI(bannerImage)}
              alt="ご夕食クーポン!"
              fill
              className="object-contain"
              sizes="100vw"
              unoptimized
            />
            {/* PC版：バナー左上に鳥アイコン＋館内案内に戻るをオーバーレイ */}
            <Link
              href="/"
              className="hidden sm:flex absolute left-4 top-4 z-10 flex-col items-center gap-2 transition-opacity hover:opacity-90 hover:underline"
              style={{ color: "#304E84" }}
            >
              <svg
                className="h-8 w-8 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M15 3h6v18h-6" />
                <path d="M10 17l5-5-5-5" />
                <path d="M13.8 12H3" />
              </svg>
              <span className="text-center text-sm font-semibold leading-tight">{t.backToGuide}</span>
            </Link>
          </div>
        </section>

        {/* 利用案内（参考画像の説明文） */}
        <section className="mb-8">
          <p className="text-center text-[15px] font-medium leading-relaxed sm:text-base" style={{ color: "#c26c36" }}>
            {t.usageMessage}
          </p>
          <p className="mt-1 text-center text-xs text-gray-600">
            {t.usageNote}
          </p>
        </section>

        {/* 3店舗クーポンカード（MAPボタン下端揃え） */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-3 md:items-stretch">
          {shopsBase.map((shop, i) => {
            const k = shop.nameKey;
            const name = t[`${k}Name`];
            // 3枚目カードはおでん 鈴＋うなぎ四代目菊川栄店の2店舗のため、ヘッダーに両方表示
            const headerTitle = k === "shop1" ? `${name}　うなぎ四代目菊川　栄店` : name;
            const hours = t[`${k}Hours`];
            const holiday = t[`${k}Holiday`];
            const address = t[`${k}Address`];
            const couponContent =
              k === "shop1" ? (
                <>
                  {t.bringCoupon}
                  <br />
                  <span className="text-white">{t.shop1Offer}</span>
                </>
              ) : k === "shop2" ? (
                <>
                  {t.bringCoupon}
                  <br />
                  <span className="whitespace-pre-line text-white">{t.shop2Offer1}</span>
                </>
              ) : (
                <>
                  {t.bringCoupon}
                  <br />
                  <span className="text-white">{t.shop3Offer}</span>
                </>
              );
            return (
              <article
                key={i}
                className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
              >
                {/* 店舗名ヘッダー（紺色・高さ固定で3枚揃え・文字はやや小さめ） */}
                <div
                  className="flex h-14 items-center justify-center px-4 py-3 text-center text-white font-semibold"
                  style={{ backgroundColor: HEADER_BG }}
                >
                  <span className="line-clamp-2 text-xs sm:text-sm">{headerTitle}</span>
                </div>

                {/* 料理画像（ヘッダーと同じ幅いっぱい・画像全体を切らずに表示・余白なし） */}
                <div className="relative w-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={encodeURI(shop.imageSrc)}
                    alt={name}
                    className="block w-full h-auto"
                  />
                </div>

                {/* クーポン内容（ベージュ・スマホは文字大きく見やすく） */}
                <div
                  className="flex h-34 flex-col items-center justify-center px-4 py-3 text-center text-base font-bold leading-relaxed sm:h-36 sm:text-sm"
                  style={{ backgroundColor: COUPON_BG, color: COUPON_TEXT_COLOR }}
                >
                  {couponContent}
                </div>

                {/* 店舗情報（白背景・MAPを下端で横揃え・MAP下に余白） */}
                <div className="flex min-h-0 flex-1 flex-col bg-white px-4 pt-3 pb-3 text-sm text-gray-900">
                  <div className="min-h-0 flex-1">
                    {shop.branches.map((b, j) => {
                      const branchName = ("name" in b && typeof b.name === "string" ? b.name : null) ?? name;
                      const branchHours = ("hours" in b && typeof b.hours === "string" ? b.hours : null) ?? hours;
                      const branchHoliday = ("holiday" in b && typeof b.holiday === "string" ? b.holiday : null) ?? holiday;
                      const branchAddress = ("address" in b && typeof b.address === "string" ? b.address : null) ?? address;
                      return (
                        <div key={j} className={j > 0 ? "mt-3 pt-3 border-t border-gray-200" : ""}>
                          <p className="font-semibold text-gray-900">{branchName}</p>
                          <p className="mt-1 text-xs whitespace-pre-line">{branchHours}</p>
                          <p className="mt-0.5 text-xs">{t.holidayLabel}{branchHoliday}</p>
                          <p className="mt-1">{branchAddress}</p>
                          <p className="mt-0.5">{t.tel} {b.tel}</p>
                          {"validity" in b && b.validity != null && typeof b.validity === "string" && (
                            <p className="mt-1 text-xs">{b.validity}</p>
                          )}
                          {"distance" in b && b.distance != null && typeof b.distance === "string" && (
                            <p className="mt-0.5 text-xs">{b.distance}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* MAPボタン（モーダルを開く・外部へ飛ばない） */}
                  <button
                    type="button"
                    onClick={() => openModal(i)}
                    className="mt-4 flex w-full shrink-0 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: MAP_BTN_BG }}
                  >
                    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    {t.map}
                  </button>
                </div>
              </article>
            );
          })}
        </section>


      </main>

      {/* 店舗詳細モーダル（MAP押下時・外部へ飛ばず画面内で表示） */}
      {openModalShopIndex !== null && (() => {
        const shop = shopsBase[openModalShopIndex];
        const k = shop.nameKey;
        const modalName = t[`${k}Name`];
        const modalImages = shopModalImages[openModalShopIndex] ?? [];
        const description = t[`shopModalDescription${k.replace("shop", "")}` as keyof typeof t];
        const modalHours = t[`${k}Hours`];
        const modalHoliday = t[`${k}Holiday`];
        const modalAddress = t[`${k}Address`];
        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div
              className="flex max-h-[90vh] w-full max-w-xl min-w-0 flex-col overflow-hidden rounded-xl bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* ヘッダー（店舗名＋閉じる） */}
              <div
                className="flex shrink-0 items-center justify-between px-4 py-3 text-white"
                style={{ backgroundColor: HEADER_BG }}
              >
                <h2 id="modal-title" className="text-lg font-semibold">
                  {modalName}
                </h2>
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded p-1 text-white/90 transition-colors hover:bg-white/20 hover:text-white"
                  aria-label={t.close}
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden">
                {/* モーダル用画像（横長画像も全体が見えるよう object-contain） */}
                {(openModalShopIndex === 0 || openModalShopIndex === 1 || openModalShopIndex === 2) && modalImages.length > 1 ? (
                  // 全店舗：スライドショー
                  <div className="relative w-full min-h-[200px] overflow-hidden bg-gray-100" style={{ aspectRatio: "16/9" }}>
                    {modalImages.map((src, idx) => (
                      <div
                        key={`${src}-${idx}`}
                        className={`absolute inset-0 transition-opacity duration-1000 ${
                          idx === currentSlideIndex ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <Image
                          src={encodeURI(src)}
                          alt={`${modalName} ${idx + 1}`}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, 800px"
                          unoptimized
                        />
                      </div>
                    ))}
                    {/* インジケーター */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {modalImages.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentSlideIndex(idx);
                          }}
                          className={`h-2 rounded-full transition-all ${
                            idx === currentSlideIndex ? "w-8 bg-white" : "w-2 bg-white/50"
                          }`}
                          aria-label={`スライド ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                ) : modalImages.length <= 1 ? (
                  <div
                    className={`relative w-full min-h-[200px] overflow-hidden ${openModalShopIndex === 1 ? '' : 'bg-gray-100'}`}
                    style={{ aspectRatio: "16/9" }}
                  >
                    <Image
                      src={encodeURI(modalImages[0] ?? "")}
                      alt={modalName}
                      fill
                      className={openModalShopIndex === 1 ? "object-cover" : "object-contain"}
                      sizes="(max-width: 768px) 100vw, 800px"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-0 sm:grid-cols-2">
                    {modalImages.map((src, idx) => (
                      <div
                        key={`${src}-${idx}`}
                        className="relative w-full min-h-[180px] overflow-hidden"
                        style={{ aspectRatio: "16/9" }}
                      >
                        <Image
                          src={encodeURI(src)}
                          alt={modalName}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 800px"
                          unoptimized
                        />
                      </div>
                    ))}
                  </div>
                )}
                <div className="min-w-0 px-4 py-4">
                  <p className="text-sm leading-relaxed text-gray-700">
                    {description}
                  </p>
                  {/* 全店舗分を表示（利久は4店舗・晴れの日2店舗・ぼんてん1店舗） */}
                  {shop.branches.map((branch, branchIndex) => {
                    const branchAddress = branch.address || ("name" in branch && typeof branch.name === "string" ? branch.name : "") || modalName;
                    const branchName = ("name" in branch && typeof branch.name === "string" ? branch.name : "") || modalName;
                    const branchHours = ("hours" in branch && typeof branch.hours === "string" ? branch.hours : null) ?? modalHours;
                    const branchHoliday = ("holiday" in branch && typeof branch.holiday === "string" ? branch.holiday : null) ?? modalHoliday;
                    const branchAddressDisplay = ("address" in branch && typeof branch.address === "string" ? branch.address : null) ?? modalAddress;
                    // 緯度経度があればそれでピン表示、なければ住所で検索（店舗名のみだと別場所になることがある）
                    const hasLatLng = "lat" in branch && "lng" in branch && typeof branch.lat === "number" && typeof branch.lng === "number";
                    const branchMapEmbedUrl = hasLatLng
                      ? `https://www.google.com/maps?q=${branch.lat},${branch.lng}&output=embed&hl=ja&z=17`
                      : `https://www.google.com/maps?q=${encodeURIComponent(branchAddressDisplay || branchAddress)}&output=embed&hl=ja&z=17`;
                    
                    const branchLabel = "name" in branch && branch.name != null ? branch.name : `${modalName} ${branchIndex + 1}`;
                    return (
                      <div
                        key={branchIndex}
                        className={`min-w-0 ${branchIndex > 0 ? "mt-6 border-t border-gray-200 pt-4" : "mt-4 border-t border-gray-200 pt-4"}`}
                      >
                        <div className="text-sm text-gray-900">
                          <p className="font-semibold">{branchName}</p>
                          <p className="mt-1">{branchAddressDisplay}</p>
                          <p className="mt-1">{t.tel} {branch.tel}</p>
                          <p className="mt-2 text-xs text-gray-600 whitespace-pre-line">{branchHours}</p>
                          <p className="mt-0.5 text-xs text-gray-600 whitespace-pre-line">{t.holidayLabel}{branchHoliday}</p>
                        </div>
                        {/* 各店舗のミニマップ（Androidではiframeが表示されない場合があるため拡大地図リンクで代替可能） */}
                        <div className="mt-3 w-full min-w-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                          <iframe
                            title={branchLabel}
                            src={branchMapEmbedUrl}
                            width="100%"
                            height="240"
                            style={{ border: 0, display: "block", minHeight: 240 }}
                            allowFullScreen
                            allow="geolocation; fullscreen"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="block w-full"
                          />
                        </div>
                        {/* 各店舗の拡大地図を表示（Android WebViewでは geo: でアプリを開く） */}
                        <MapFallbackLinkGeneric
                          address={branchAddress || branchName}
                          placeUrl={"placeUrl" in branch && typeof branch.placeUrl === "string" ? branch.placeUrl : undefined}
                          className="mt-2 flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                          style={{ backgroundColor: MAP_BTN_BG }}
                        >
                          <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                          </svg>
                          {t.showLargerMap}
                        </MapFallbackLinkGeneric>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
