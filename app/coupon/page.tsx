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
const shopImages = [
  `${COUPON_SITE}/437042.jpg`, // 栄の串せぶん / うなぎ四代目菊川 栄店
  `${COUPON_SITE}/437040.jpg`, // 大衆すし酒場 魚喜
  `${COUPON_SITE}/437041.jpg`, // 大衆ホルモン・煙力 伏見店
];

/** モーダル用の店舗詳細画像（MAP押下時に表示）※表示順に合わせて並べ替え */
const shopModalImages: string[][] = [
  [`${COUPON_SITE}/437041.jpg`], // 1番目: 大衆ホルモン・煙力 伏見店
  [`${COUPON_SITE}/437042.jpg`], // 2番目: 栄の串せぶん
  [`${COUPON_SITE}/437040.jpg`], // 3番目: 大衆すし酒場 魚喜
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
    shop2Or: string;
    shop2Offer2: string;
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
    shop1Offer: "注文時にスタッフへ提示で ドリンク1杯無料",
    shop2Offer1: "刺盛5点盛り半額（税込1,518円）",
    shop2Or: "または",
    shop2Offer2: "ドリンク1杯人数分無料",
    shop3Offer: "日曜・金曜 60分飲み放題500円／水曜・土曜 1杯198円（※お一人様3,000円以上）",
    map: "MAP",
    tel: "TEL",
    showLargerMap: "拡大地図を表示",
    close: "閉じる",
    holidayLabel: "定休日：",
    shopModalDescription1: "配布のクーポン券持参または、この画面の提示で岩手名物盛岡冷麺(ハーフ)、前沢牛60gまたは県産ゴチャ盛り豚ホルモン無料!!",
    shopModalDescription2: "注文時スタッフに提示でファーストドリンクかお刺身三点盛り人数分無料。",
    shopModalDescription3: "配布のクーポン券持参または、この画面の提示でファーストドリンクかお刺身三点盛り人数分無料！",
    shop1Name: "栄の串せぶん",
    shop1Hours: "11:30～14:00（L.O.13:30）／17:00～23:00（L.O.22:30）",
    shop1Holiday: "日曜・祝日",
    shop1Address: "〒460-0003 名古屋市中区錦2-20-15 広小路クロスタワー1F",
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
    shop1Offer: "1 free drink when you show this to staff when ordering",
    shop2Offer1: "5-piece sashimi platter half price (¥1,518 incl. tax)",
    shop2Or: "or",
    shop2Offer2: "1 free drink per person",
    shop3Offer: "Sun & Fri: 60-min all-you-can-drink ¥500 / Wed & Sat: ¥198 per drink (min. ¥3,000/person)",
    map: "MAP",
    tel: "TEL",
    showLargerMap: "Show larger map",
    close: "Close",
    holidayLabel: "Holiday:",
    shopModalDescription1: "With your coupon ticket or by showing this screen, get either Morioka cold noodles (half size) or Maesawa beef 60g free!!",
    shopModalDescription2: "Show to staff when ordering to get first drink or 3-piece sashimi platter free per person.",
    shopModalDescription3: "With your coupon ticket or by showing this screen, get first drink or 3-piece sashimi platter free per person!",
    shop1Name: "Sakaenokushi Seven",
    shop1Hours: "11:30～14:00 (L.O. 13:30) / 17:00～23:00 (L.O. 22:30)",
    shop1Holiday: "Closed Sun. & holidays",
    shop1Address: "〒460-0003 2-20-15 Nishiki, Naka-ku, Nagoya, Hirokoji Cross Tower 1F",
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
    shop1Offer: "点餐时向店员出示可享饮料1杯免费",
    shop2Offer1: "刺身5点拼盘半价（含税1,518日元）",
    shop2Or: "或",
    shop2Offer2: "饮料每人1杯免费",
    shop3Offer: "周日・周五 60分钟畅饮500日元／周三・周六 每杯198日元（每人消费满3,000日元以上）",
    map: "地图",
    tel: "电话",
    showLargerMap: "显示大地图",
    close: "关闭",
    holidayLabel: "定休日：",
    shopModalDescription1: "持发放的优惠券或出示此画面，可免费获得岩手名物盛冈冷面（半份）或前泽牛60g任选其一!!",
    shopModalDescription2: "点餐时向工作人员出示，可免费获得首杯饮品或三片刺身拼盘（按人数）。",
    shopModalDescription3: "持发放的优惠券或出示此画面，可免费获得首杯饮品或三片刺身拼盘（按人数）！",
    shop1Name: "荣之串七",
    shop1Hours: "11:30～14:00（最后点餐13:30）／17:00～23:00（最后点餐22:30）",
    shop1Holiday: "周日・节假日休息",
    shop1Address: "〒460-0003 名古屋市中区锦2-20-15 广小路克罗斯塔1F",
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
    shop1Offer: "點餐時向店員出示可享飲料1杯免費",
    shop2Offer1: "刺身5點拼盤半價（含稅1,518日圓）",
    shop2Or: "或",
    shop2Offer2: "飲料每人1杯免費",
    shop3Offer: "週日・週五 60分鐘暢飲500日圓／週三・週六 每杯198日圓（每人消費滿3,000日圓以上）",
    map: "地圖",
    tel: "電話",
    showLargerMap: "顯示大地圖",
    close: "關閉",
    holidayLabel: "定休日：",
    shopModalDescription1: "持發放的優惠券或出示此畫面，可免費獲得岩手名物盛岡冷麵（半份）或前澤牛60g任選其一!!",
    shopModalDescription2: "點餐時向工作人員出示，可免費獲得首杯飲品或三片刺身拼盤（按人數）。",
    shopModalDescription3: "持發放的優惠券或出示此畫面，可免費獲得首杯飲品或三片刺身拼盤（按人數）！",
    shop1Name: "榮之串七",
    shop1Hours: "11:30～14:00（最後點餐13:30）／17:00～23:00（最後點餐22:30）",
    shop1Holiday: "週日・節假日休息",
    shop1Address: "〒460-0003 名古屋市中區錦2-20-15 廣小路克羅斯塔 1F",
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
    shop1Offer: "주문 시 스태프에게 제시하면 음료 1잔 무료",
    shop2Offer1: "회 5점 모둠 반가격（세금 포함 1,518엔）",
    shop2Or: "또는",
    shop2Offer2: "음료 1인당 1잔 무료",
    shop3Offer: "일・금 60분 무제한 음료 500엔／수・토 1잔 198엔（1인 3,000엔 이상）",
    map: "지도",
    tel: "TEL",
    showLargerMap: "지도 크게 보기",
    close: "닫기",
    holidayLabel: "정기 휴일:",
    shopModalDescription1: "배포 쿠폰을 지참하거나 이 화면을 제시하면 이와테 명물 모리오카 냉면(하프) 또는 마에사와 소고기 60g 중 하나를 무료로 받을 수 있습니다!!",
    shopModalDescription2: "주문 시 스태프에게 제시하면 첫 음료 또는 사시미 3점 모둠을 인원수만큼 무료로 받을 수 있습니다.",
    shopModalDescription3: "배포 쿠폰을 지참하거나 이 화면을 제시하면 첫 음료 또는 사시미 3점 모둠을 인원수만큼 무료로 받을 수 있습니다!",
    shop1Name: "사카에노쿠시 세븐",
    shop1Hours: "11:30～14:00（마지막 주문 13:30）／17:00～23:00（마지막 주문 22:30）",
    shop1Holiday: "일요일・공휴일 휴무",
    shop1Address: "〒460-0003 나고야시 나카구 니시키 2-20-15 히로코지 크로스 타워 1F",
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
    shop1Offer: "1 boisson offerte en présentant au personnel à la commande",
    shop2Offer1: "Plateau de 5 sashimis à moitié prix (1 518 ¥ TTC)",
    shop2Or: "ou",
    shop2Offer2: "1 boisson offerte par personne",
    shop3Offer: "Dim. & ven. : boissons à volonté 60 min 500 ¥ / Mer. & sam. : 198 ¥/verre (min. 3 000 ¥/pers.)",
    map: "CARTE",
    tel: "TEL",
    showLargerMap: "Agrandir la carte",
    close: "Fermer",
    holidayLabel: "Jours de fermeture :",
    shopModalDescription1: "Avec votre coupon ou en montrant cet écran, obtenez gratuitement soit des nouilles froides de Morioka (demi-portion) ou 60g de bœuf Maesawa!!",
    shopModalDescription2: "Montrez au personnel lors de la commande pour obtenir une première boisson ou un assortiment de sashimi (3 pièces) gratuit par personne.",
    shopModalDescription3: "Avec votre coupon ou en montrant cet écran, obtenez une première boisson ou un assortiment de sashimi (3 pièces) gratuit par personne!",
    shop1Name: "Sakaenokushi Seven",
    shop1Hours: "11:30～14:00 (Dernière cde 13:30) / 17:00～23:00 (Dernière cde 22:30)",
    shop1Holiday: "Fermé dim. et jours fériés",
    shop1Address: "〒460-0003 2-20-15 Nishiki, Naka-ku, Nagoya, Hirokoji Cross Tower 1F",
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
    shop1Offer: "1 Getränk gratis bei Vorzeigen bei der Bestellung",
    shop2Offer1: "5-teilige Sashimi-Platte halber Preis (1.518 ¥ inkl. MwSt.)",
    shop2Or: "oder",
    shop2Offer2: "1 Getränk pro Person gratis",
    shop3Offer: "So. & Fr.: 60 Min. Flatrate 500 ¥ / Mi. & Sa.: 198 ¥/Glas (min. 3.000 ¥/Pers.)",
    map: "KARTE",
    tel: "TEL",
    showLargerMap: "Karte vergrößern",
    close: "Schließen",
    holidayLabel: "Ruhetag:",
    shopModalDescription1: "Mit Ihrem Gutschein oder durch Zeigen dieses Bildschirms erhalten Sie kostenlos entweder Morioka-Kaltnudeln (halbe Portion) oder 60g Maesawa-Rindfleisch!!",
    shopModalDescription2: "Zeigen Sie dem Personal beim Bestellen, um ein erstes Getränk oder eine Sashimi-Platte (3 Stück) kostenlos pro Person zu erhalten.",
    shopModalDescription3: "Mit Ihrem Gutschein oder durch Zeigen dieses Bildschirms erhalten Sie ein erstes Getränk oder eine Sashimi-Platte (3 Stück) kostenlos pro Person!",
    shop1Name: "Sakaenokushi Seven",
    shop1Hours: "11:30～14:00 (Letzte Best. 13:30) / 17:00～23:00 (Letzte Best. 22:30)",
    shop1Holiday: "So. & Feiertage geschlossen",
    shop1Address: "〒460-0003 2-20-15 Nishiki, Naka-ku, Nagoya, Hirokoji Cross Tower 1F",
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
    shop1Offer: "1 bebida gratis mostrando al personal al pedir",
    shop2Offer1: "Plato de 5 sashimis a mitad de precio (1.518 ¥ IVA incl.)",
    shop2Or: "o",
    shop2Offer2: "1 bebida gratis por persona",
    shop3Offer: "Dom. y vie.: 60 min barra libre 500 ¥ / Mié. y sáb.: 198 ¥/copa (mín. 3.000 ¥/pers.)",
    map: "MAPA",
    tel: "TEL",
    showLargerMap: "Ver mapa más grande",
    close: "Cerrar",
    holidayLabel: "Día de descanso:",
    shopModalDescription1: "Con su cupón o mostrando esta pantalla, obtenga gratis fideos fríos de Morioka (media porción) o 60g de carne de res Maesawa!!",
    shopModalDescription2: "Muestre al personal al hacer el pedido para obtener una primera bebida o un plato de sashimi (3 piezas) gratis por persona.",
    shopModalDescription3: "Con su cupón o mostrando esta pantalla, obtenga una primera bebida o un plato de sashimi (3 piezas) gratis por persona!",
    shop1Name: "Sakaenokushi Seven",
    shop1Hours: "11:30～14:00 (Últ. pedido 13:30) / 17:00～23:00 (Últ. pedido 22:30)",
    shop1Holiday: "Cerrado dom. y festivos",
    shop1Address: "〒460-0003 2-20-15 Nishiki, Naka-ku, Nagoya, Hirokoji Cross Tower 1F",
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
    shop1Offer: "1 bevanda gratis mostrando al personale all'ordine",
    shop2Offer1: "Piatto di 5 sashimi a metà prezzo (1.518 ¥ IVA incl.)",
    shop2Or: "o",
    shop2Offer2: "1 bevanda gratis a persona",
    shop3Offer: "Dom. e ven.: 60 min bevande illimitate 500 ¥ / Mer. e sab.: 198 ¥/bicchiere (min. 3.000 ¥/pers.)",
    map: "MAPA",
    tel: "TEL",
    showLargerMap: "Visualizza mappa più grande",
    close: "Chiudi",
    holidayLabel: "Giorno di chiusura:",
    shopModalDescription1: "Con il tuo coupon o mostrando questo schermo, ottieni gratis noodles freddi di Morioka (mezza porzione) o 60g di manzo Maesawa!!",
    shopModalDescription2: "Mostra al personale quando ordini per ottenere una prima bevanda o un piatto di sashimi (3 pezzi) gratis a persona.",
    shopModalDescription3: "Con il tuo coupon o mostrando questo schermo, ottieni una prima bevanda o un piatto di sashimi (3 pezzi) gratis a persona!",
    shop1Name: "Sakaenokushi Seven",
    shop1Hours: "11:30～14:00 (Ult. ordine 13:30) / 17:00～23:00 (Ult. ordine 22:30)",
    shop1Holiday: "Chiuso dom. e festivi",
    shop1Address: "〒460-0003 2-20-15 Nishiki, Naka-ku, Nagoya, Hirokoji Cross Tower 1F",
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
    shop1Offer: "แสดงต่อพนักงานเมื่อสั่งอาหาร ได้เครื่องดื่ม 1 แก้วฟรี",
    shop2Offer1: "ซาชิมิ 5 ชิ้น ครึ่งราคา (1,518 เยน รวมภาษี)",
    shop2Or: "หรือ",
    shop2Offer2: "เครื่องดื่ม 1 แก้วต่อคน ฟรี",
    shop3Offer: "อาทิตย์・ศุกร์ ดื่มไม่จำกัด 60 นาที 500 เยน / พุธ・เสาร์ 198 เยน/แก้ว (ขั้นต่ำ 3,000 เยน/คน)",
    map: "แผนที่",
    tel: "TEL",
    showLargerMap: "แสดงแผนที่ขนาดใหญ่",
    close: "ปิด",
    holidayLabel: "วันหยุด:",
    shopModalDescription1: "นำคูปองมาหรือแสดงหน้าจอนี้ รับบะหมี่เย็นโมริโอกะ (ครึ่งส่วน) หรือเนื้อเมะซาวะ 60g ฟรี!!",
    shopModalDescription2: "แสดงให้พนักงานเมื่อสั่งอาหารเพื่อรับเครื่องดื่มแรกหรือซาชิมิ 3 ชิ้น ฟรีต่อคน",
    shopModalDescription3: "นำคูปองมาหรือแสดงหน้าจอนี้ รับเครื่องดื่มแรกหรือซาชิมิ 3 ชิ้น ฟรีต่อคน!",
    shop1Name: "ซากาเอะ โนะ คูชิเซบุง",
    shop1Hours: "17:00～24:00 (สั่งสุดท้าย อาหาร 23:00 / เครื่องดื่ม 23:30)",
    shop1Holiday: "ปิดวันอาทิตย์และวันหยุดนักขัตฤกษ์",
    shop1Address: "〒460-0003 3-20-12 นิชิกิ นากะ-คุ นาโงยะ อาคารไดฮาจิ นิชิกิ 1F",
    shop2Name: "ซากานะ โดโคโระ อิชิยะ โอโดริ",
    shop2Hours: "11:30～14:00 (สั่งสุดท้าย 13:30) / 17:00～23:00 (สั่งสุดท้าย 22:30)",
    shop2Holiday: "ปิดวันอาทิตย์และวันหยุดนักขัตฤกษ์",
    shop2Address: "〒460-0003 2-20-15 นิชิกิ นากะ-คุ นาโงยะ ฮิโระโกจิ ครอส ทาวเวอร์ 1F",
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
    shop1Offer: "Khi gọi món, xuất trình cho nhân viên được 1 ly nước miễn phí",
    shop2Offer1: "Đĩa sashimi 5 miếng giảm nửa giá (1.518 yên đã gồm thuế)",
    shop2Or: "hoặc",
    shop2Offer2: "1 ly nước miễn phí/người",
    shop3Offer: "CN & T6: 60 phút uống thoải mái 500 yên / T4 & T7: 198 yên/ly (tối thiểu 3.000 yên/người)",
    map: "BẢN ĐỒ",
    tel: "TEL",
    showLargerMap: "Hiện bản đồ lớn hơn",
    close: "Đóng",
    holidayLabel: "Ngày nghỉ:",
    shopModalDescription1: "Mang theo phiếu hoặc hiển thị màn hình này để nhận miễn phí mì lạnh Morioka (nửa phần) hoặc 60g thịt bò Maesawa!!",
    shopModalDescription2: "Hiển thị cho nhân viên khi đặt hàng để nhận đồ uống đầu tiên hoặc đĩa sashimi (3 miếng) miễn phí mỗi người.",
    shopModalDescription3: "Mang theo phiếu hoặc hiển thị màn hình này để nhận đồ uống đầu tiên hoặc đĩa sashimi (3 miếng) miễn phí mỗi người!",
    shop1Name: "Sakaenokushi Seven",
    shop1Hours: "17:00～24:00 (Đồ ăn 23:00 / Đồ uống 23:30)",
    shop1Holiday: "Đóng CN và ngày lễ",
    shop1Address: "〒460-0003 3-20-12 Nishiki, Naka-ku, Nagoya, Tòa nhà Daihachi Nishiki 1F",
    shop2Name: "UOYOROKOBI (Sushi & Izakaya)",
    shop2Hours: "11:30～14:00 (Đặt món cuối 13:30) / 17:00～23:00 (Đặt món cuối 22:30)",
    shop2Holiday: "Đóng CN và ngày lễ",
    shop2Address: "〒460-0003 2-20-15 Nishiki, Naka-ku, Nagoya, Hirokoji Cross Tower 1F",
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
    shop1Offer: "Tunjukkan ke staf saat memesan dapat 1 minuman gratis",
    shop2Offer1: "Piring sashimi 5 potong setengah harga (1.518 yen incl. pajak)",
    shop2Or: "atau",
    shop2Offer2: "1 minuman gratis per orang",
    shop3Offer: "Min & Jum: 60 menit minum sepuasnya 500 yen / Rab & Sab: 198 yen/gelas (min. 3.000 yen/orang)",
    map: "PETA",
    tel: "TEL",
    showLargerMap: "Tampilkan peta lebih besar",
    close: "Tutup",
    holidayLabel: "Hari libur:",
    shopModalDescription1: "Dengan kupon Anda atau dengan menampilkan layar ini, dapatkan gratis mie dingin Morioka (setengah porsi) atau 60g daging sapi Maesawa!!",
    shopModalDescription2: "Tunjukkan kepada staf saat memesan untuk mendapatkan minuman pertama atau piring sashimi (3 potong) gratis per orang.",
    shopModalDescription3: "Dengan kupon Anda atau dengan menampilkan layar ini, dapatkan minuman pertama atau piring sashimi (3 potong) gratis per orang!",
    shop1Name: "Sakaenokushi Seven",
    shop1Hours: "17:00～24:00 (Makanan 23:00 / Minuman 23:30)",
    shop1Holiday: "Tutup Ahad & cuti",
    shop1Address: "〒460-0003 3-20-12 Nishiki, Naka-ku, Nagoya, Bangunan Daihachi Nishiki 1F",
    shop2Name: "UOYOROKOBI (Sushi & Izakaya)",
    shop2Hours: "11:30～14:00 (Pesanan terakhir 13:30) / 17:00～23:00 (Pesanan terakhir 22:30)",
    shop2Holiday: "Tutup Ahad & cuti",
    shop2Address: "〒460-0003 2-20-15 Nishiki, Naka-ku, Nagoya, Hirokoji Cross Tower 1F",
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
    shop1Offer: "1 bebida grátis ao mostrar ao staff ao pedir",
    shop2Offer1: "Prato de 5 sashimis a metade do preço (1.518 ¥ c/ IVA)",
    shop2Or: "ou",
    shop2Offer2: "1 bebida grátis por pessoa",
    shop3Offer: "Dom. e sex.: 60 min barra livre 500 ¥ / Qua. e sáb.: 198 ¥/copo (mín. 3.000 ¥/pessoa)",
    map: "MAPA",
    tel: "TEL",
    showLargerMap: "Mostrar mapa maior",
    close: "Fechar",
    holidayLabel: "Dia de descanso:",
    shopModalDescription1: "Com seu cupom ou mostrando esta tela, obtenha gratuitamente macarrão frio de Morioka (meia porção) ou 60g de carne bovina Maesawa!!",
    shopModalDescription2: "Mostre à equipe ao fazer o pedido para obter uma primeira bebida ou prato de sashimi (3 peças) grátis por pessoa.",
    shopModalDescription3: "Com seu cupom ou mostrando esta tela, obtenha uma primeira bebida ou prato de sashimi (3 peças) grátis por pessoa!",
    shop1Name: "Sakaenokushi Seven",
    shop1Hours: "17:00～24:00 (Comida 23:00 / Bebida 23:30)",
    shop1Holiday: "Fechado dom. e feriados",
    shop1Address: "〒460-0003 3-20-12 Nishiki, Naka-ku, Nagoya, Ed. Daihachi Nishiki 1F",
    shop2Name: "UOYOROKOBI (Sushi & Izakaya)",
    shop2Hours: "11:30～14:00 (Últ. pedido 13:30) / 17:00～23:00 (Últ. pedido 22:30)",
    shop2Holiday: "Fechado dom. e feriados",
    shop2Address: "〒460-0003 2-20-15 Nishiki, Naka-ku, Nagoya, Hirokoji Cross Tower 1F",
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
    shop1Offer: "1 inumin libre kapag ipinakita sa staff sa pag-order",
    shop2Offer1: "5-pirasong sashimi platter kalahating presyo (¥1,518 incl. tax)",
    shop2Or: "o",
    shop2Offer2: "1 inumin libre bawat tao",
    shop3Offer: "Linggo at Biy.: 60 min all-you-can-drink ¥500 / Miy. at Sab.: ¥198/baso (min. ¥3,000/tao)",
    map: "MAPA",
    tel: "TEL",
    showLargerMap: "Ipakita ang mas malaking mapa",
    close: "Isara",
    holidayLabel: "Araw ng pahinga:",
    shopModalDescription1: "Sa iyong coupon o sa pagpapakita ng screen na ito, makakuha ng libreng malamig na noodles ng Morioka (kalahating bahagi) o 60g ng karne ng baka na Maesawa!!",
    shopModalDescription2: "Ipakita sa staff kapag umorder upang makakuha ng unang inumin o plato ng sashimi (3 piraso) libre bawat tao.",
    shopModalDescription3: "Sa iyong coupon o sa pagpapakita ng screen na ito, makakuha ng unang inumin o plato ng sashimi (3 piraso) libre bawat tao!",
    shop1Name: "Sakaenokushi Seven",
    shop1Hours: "17:00～24:00 (Pagkain 23:00 / Inumin 23:30)",
    shop1Holiday: "Sarado Linggo at holidays",
    shop1Address: "〒460-0003 3-20-12 Nishiki, Naka-ku, Nagoya, Gusali Daihachi Nishiki 1F",
    shop2Name: "UOYOROKOBI (Sushi & Izakaya)",
    shop2Hours: "11:30～14:00 (Huling order 13:30) / 17:00～23:00 (Huling order 22:30)",
    shop2Holiday: "Sarado Linggo at holidays",
    shop2Address: "〒460-0003 2-20-15 Nishiki, Naka-ku, Nagoya, Hirokoji Cross Tower 1F",
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
    shop1Offer: "Tunjukkan kepada kakitangan ketika pesanan untuk 1 minuman percuma",
    shop2Offer1: "Sashimi 5 keping separuh harga (1,518 yen incl. cukai)",
    shop2Or: "atau",
    shop2Offer2: "1 minuman percuma seorang",
    shop3Offer: "Ahad & Jumaat: 60 min minum tanpa had 500 yen / Rabu & Sabtu: 198 yen/gelas (min. 3,000 yen/orang)",
    map: "PETA",
    tel: "TEL",
    showLargerMap: "Tunjukkan peta lebih besar",
    close: "Tutup",
    holidayLabel: "Hari cuti:",
    shopModalDescription1: "Dengan kupon anda atau dengan menunjukkan skrin ini, dapatkan mi sejuk Morioka (separuh bahagian) atau 60g daging lembu Maesawa percuma!!",
    shopModalDescription2: "Tunjukkan kepada kakitangan semasa membuat pesanan untuk mendapatkan minuman pertama atau pinggan sashimi (3 keping) percuma setiap orang.",
    shopModalDescription3: "Dengan kupon anda atau dengan menunjukkan skrin ini, dapatkan minuman pertama atau pinggan sashimi (3 keping) percuma setiap orang!",
    shop1Name: "Sakaenokushi Seven",
    shop1Hours: "17:00～24:00 (Makanan 23:00 / Minuman 23:30)",
    shop1Holiday: "Tutup Ahad & cuti",
    shop1Address: "〒460-0003 3-20-12 Nishiki, Naka-ku, Nagoya, Bangunan Daihachi Nishiki 1F",
    shop2Name: "UOYOROKOBI (Sushi & Izakaya)",
    shop2Hours: "11:30～14:00 (Pesanan terakhir 13:30) / 17:00～23:00 (Pesanan terakhir 22:30)",
    shop2Holiday: "Tutup Ahad & cuti",
    shop2Address: "〒460-0003 2-20-15 Nishiki, Naka-ku, Nagoya, Hirokoji Cross Tower 1F",
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

// 表示順: 1番目＝大衆ホルモン・煙力 伏見店、2番目＝栄の串せぶん、3番目＝大衆すし酒場 魚喜
const shopsBase = [
  {
    nameKey: "shop3" as const,
    imageSrc: shopImages[2],
    branches: [
      {
        name: "大衆ホルモン・煙力 伏見店",
        address: "〒460-0008 名古屋市中区栄2丁目2-34 蒼園ビル",
        tel: "052-265-7926",
        hours: "16:00～23:00（L.O.22:30）",
        holiday: "年中無休（12/31～1/2休業）",
        lat: 35.169,
        lng: 136.908,
        placeUrl: "https://www.google.com/maps/search/?api=1&query=大衆ホルモン+煙力+伏見店+名古屋",
      },
    ],
    hours: "16:00～23:00（L.O.22:30）",
    holiday: "年中無休（12/31～1/2休業）",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=大衆ホルモン+煙力+伏見店+名古屋",
  },
  /* 2枚目: 串せぶんの写真 + 魚喜のテキスト（名前・営業時間・住所・TEL） */
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
        placeUrl: "https://www.google.com/maps/search/?api=1&query=大衆すし酒場+魚喜+名古屋",
      },
    ],
    hours: "17:00～24:00（L.O.Food 23:00／Drink 23:30）",
    holiday: "日曜・祝日",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=大衆すし酒場+魚喜+名古屋",
  },
  /* 3枚目: 魚喜の写真 + 串せぶんのテキスト（同一タブに栄の串せぶん＋うなぎ四代目菊川栄店） */
  {
    nameKey: "shop1" as const,
    imageSrc: shopImages[1],
    branches: [
      {
        name: "栄の串せぶん",
        address: "〒460-0003 名古屋市中区錦2-20-15 広小路クロスタワー1F",
        tel: "052-222-7707",
        hours: "11:30～14:00（L.O.13:30）\n17:00～23:00（L.O.22:30）",
        holiday: "日曜・祝日",
        lat: 35.1705,
        lng: 136.898,
        placeUrl: "https://www.google.com/maps/search/?api=1&query=名古屋市中区錦2-20-15+栄の串せぶん",
      },
      {
        name: "うなぎ四代目菊川栄店",
        address: "〒460-0003 愛知県名古屋市中区錦3-24-17 BINO栄5F",
        tel: "050-5494-3673",
        hours: "11:00～15:00（L.O.14:00）／17:00～22:00（L.O.21:00）",
        holiday: "年中無休",
        lat: 35.1702,
        lng: 136.900,
        placeUrl: "https://www.google.com/maps/search/?api=1&query=うなぎ四代目菊川+栄店+名古屋",
      },
    ],
    hours: "11:30～14:00（L.O.13:30）／17:00～23:00（L.O.22:30）",
    holiday: "日曜・祝日",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=栄の串せぶん+名古屋",
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
                  <span className="text-white">
                    {t.shop2Offer1}
                    {t.shop2Or && t.shop2Offer2 ? (
                      <>
                        <br />
                        {t.shop2Or}
                        <br />
                        {t.shop2Offer2}
                      </>
                    ) : null}
                  </span>
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
                  <span className="line-clamp-2 text-xs sm:text-sm">{name}</span>
                </div>

                {/* 料理画像（クーポン幅いっぱい・ややアップで見やすく表示） */}
                <div className="relative w-full h-[240px] sm:h-[300px] md:h-[360px] bg-gray-700 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={encodeURI(shop.imageSrc)}
                    alt={name}
                    className="absolute inset-0 w-full h-full object-cover object-center"
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
                  {openModalShopIndex === 0 && (
                    <a
                      href="https://www.hotpepper.jp/strJ001143787/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm font-semibold text-[#304E84] underline underline-offset-2"
                    >
                      公式HP
                    </a>
                  )}
                  {openModalShopIndex === 2 && (
                    <a
                      href="https://www.hotpepper.jp/strJ001185245/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm font-semibold text-[#304E84] underline underline-offset-2"
                    >
                      公式HP
                    </a>
                  )}
                  {openModalShopIndex === 1 && (
                    <a
                      href="https://www.hotpepper.jp/strJ001250661/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm font-semibold text-[#304E84] underline underline-offset-2"
                    >
                      公式HP
                    </a>
                  )}
                  {/* 全店舗分を表示（利久は4店舗・晴れの日2店舗・ぼんてん1店舗） */}
                  {shop.branches.map((branch, branchIndex) => {
                    const branchAddress = branch.address || ("name" in branch && typeof branch.name === "string" ? branch.name : "") || modalName;
                    const branchName = ("name" in branch && typeof branch.name === "string" ? branch.name : "") || modalName;
                    const branchHours = ("hours" in branch && typeof branch.hours === "string" ? branch.hours : null) ?? modalHours;
                    const branchHoliday = ("holiday" in branch && typeof branch.holiday === "string" ? branch.holiday : null) ?? modalHoliday;
                    const branchAddressDisplay = ("address" in branch && typeof branch.address === "string" ? branch.address : null) ?? modalAddress;
                    // 店舗名で検索（ホームページと同様）
                    const branchMapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(branchName)}&output=embed&hl=ja&z=17`;
                    
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
