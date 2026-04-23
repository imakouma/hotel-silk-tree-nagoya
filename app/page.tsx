'use client';

import { use, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage, type LanguageCode } from '@/contexts/LanguageContext';
import { MapFallbackLink } from '@/components/MapFallbackLink';

const translations = {
  ja: {
    hotelName: '',
    hotelTitle: 'ホテル シルク・トゥリー 名古屋',
    heroTitle: '館内のご案内',
    welcomeMessage: '本日は「ホテル シルク・トゥリー 名古屋」をご利用いただき誠にありがとうございます。',
    welcomeMessage2: '',
    restaurantCoupon: '限定クーポン',
    checkInOut: '入退館時間',
    bath: 'アメニティ',
    breakfast: '朝食',
    dinner: '限定クーポン',
    service: '館内案内',
    wifi: 'Wi-Fi',
    lighting: '室内照明',
    longstay: '連泊清掃',
    lost: 'お忘れ物について',
    quickCheckin: '快速チェックイン',
    dinnerTab: '限定クーポン',
    serviceTab: '館内案内',
    close: '閉じる',
    checkIn: 'チェックイン',
    checkOut: 'チェックアウト',
    planNote: 'ご不明な点はフロント内線333へお問い合わせください。',
    bbhMember: 'シルク・ツリーメンバーズ',
    earlyCheckin: 'アーリーチェックイン',
    earlyCheckinFee: '1時間につき1,000円（最大14:00まで）',
    lobbyDesc1: 'ヨーロピアン・アンティークの調度品が優雅なロビー。',
    lobbyDesc2: '都会の謙遜を忘れる落ち着いた空間です。',
    lobbyDesc3: '「スターバックス コーヒー」はロビーから直接お入りいただけます。',
    amenitiesTitle: 'アメニティ・ナイトウェア',
    amenitiesNote: 'アメニティとナイトウェアはロビー棚から自由にご利用いただけます。1F アメニティバイキング 14:00～25:00。',
    amenityTowel: 'タオル',
    amenityBathTowel: 'バスタオル',
    amenityDryer: 'ドライヤー',
    amenityDeodorant: '消臭スプレー',
    amenityShampoo: 'シャンプー',
    amenityConditioner: 'リンス',
    amenityHandSoap: 'ハンドソープ',
    amenityToothbrush: 'ハミガキセット',
    amenityBodySoap: 'ボディーソープ',
    breakfastVenue: '朝食会場',
    breakfastFloor: '2F ALLY\'s Nagoya',
    breakfastTime: '営業時間',
    breakfastTimeDetail: '6:30～9:30（オーダーストップ9:00）',
    breakfastDesc: '2つのスタイルを一度に楽しむ朝ごはん。ヨーロピアン&オリエンタルスタイルビュッフェ。',
    breakfastCatchphrase: '名古屋めし・和惣菜・パン・シリアルなど、お好みのスタイルでお楽しみください。',
    breakfastNotice: '入店には朝食券が必要です。スリッパでの入店はご遠慮ください。',
    bathTitle: 'アメニティ',
    bathDescription: 'ロビー棚から自由にご利用いただけます',
    operatingHours: '営業時間:',
    bathHours: '15:00~翌10:00',
    saunaNote: '(サウナのみ1:00~5:00停止)',
    notice: 'ご注意',
    bathNotice1: '※タオル、アメニティは各自お部屋からお持ちください。',
    bathNotice2: '※女性大浴場へ入場する際は暗証番号が必要です。暗証番号はフロントにてお渡しします。',
    freeService: '無料サービス',
    bathServiceDesc: '乳酸菌飲料とアイスキャンディーを無料で提供しております。',
    breakfastTitle: 'ご朝食のご案内（2F ALLY\'s Nagoya）',
    breakfastPrice: '大人 1,650円（税込）／小学生 1,100円（税込）',
    breakfastPriceLabel: '朝食料金',
    breakfastHours: '6:30～9:30（オーダーストップ9:00・当日購入最終受付9:00）',
    breakfastPurchaseNote: '※当日の朝食をご要望の方はフロントにて朝食券を販売しております。',
    breakfastPreschoolFree: '※未就学児は無料です。',
    breakfastDetail: '「種類豊富なパン」「フルーツコンフィチュール」「ハムやサラダなど」の洋食コーナーと、ご飯をベースに和食・名古屋めし・中華・アジア料理を取り入れたオリエンタルコーナーが楽しめるブッフェスタイル。のっけ丼・お茶漬け、きしめん・味噌カツ・どて煮・あんバターなどの名古屋めし、パン＆シリアル、味噌玉のお味噌汁・日替わりスープ、サラダコーナー（ドレッシング5種以上）、デトックスウォーター・フルーツティー・コーヒーなどドリンクも充実しています。',
    breakfastMenuNote: '※ブッフェは日替わりでのご提供のため、すべてのメニューがご用意できない場合がございます。',
    breakfastNote1: '※満席の場合はお待ちいただくことがございます。',
    breakfastNote2: '※混雑状況により営業時間を変更させていただく場合がございます。',
    sobaTitle: '■夜鳴きそば (ハーフサイズ) / 無料',
    sobaHours: '21:30~23:00',
    sobaNote: '※営業時間は変更になる場合がございます。',
    serviceTitle: '館内案内',
    floor1F: '■ 1F',
    freeSpaceNote: '',
    freeSpace: 'ウェルカムドリンクサービス',
    freeSpaceHours: '1F',
    microwave: 'アメニティバイキング（14:00～25:00）1F',
    iwateSachiko: '喫煙所 1F',
    wrappingVending: '自動販売機 1F・3F',
    souvenirVending1: '電子レンジ 3F・4F・6F・8F・10F',
    floor2F: '■ 3F',
    vendingMachine: '自動販売機',
    iceMaker: '製氷機 3Fコインランドリー内',
    vendingMachineNote: 'コミックコーナー 3F（英語の漫画もあり）',
    laundry: 'コインランドリー 3F',
    laundryHours: '洗剤は自動投入されます',
    alcoholNote: '(アルコール類は5・7・9F)',
    smoking: '喫煙所 1F',
    wifiTitle: 'Wi-Fi',
    password: 'パスワード :',
    wifiAccessPoint: 'SSIDは「silktree」です。パスワードは「silktree」です。有線LANケーブルのご利用はできません。',
    copy: 'コピー',
    wifiCopyNote: '※ボタンを押すとパスワードをコピーできます。',
    passwordCopied: 'パスワードをコピーしました！',
    lostTitle: 'お忘れ物',
    lostText1: 'お客様がチェックアウトしたあと、手荷物又は携帯品が当ホテルに保管の依頼が無く残置されていた場合、所有者が破棄したものとして当ホテルの規定に基づき処分させていただきます。',
    lostText2: '',
    lostText3: '',
    lightingTitle: '室内照明',
    lightingDesc: '入室後、入口脇の電源ソケットにお部屋のキーホルダーを差し込む事で室内照明は点灯致します。',
    lightingNote: '※キーを電源ソケットに差し込みます。',
    longstayTitle: '連泊清掃のご案内',
    cleaningHours: 'SDGsの観点から連泊時の清掃は基本的に中止です。衛生管理のため、7日毎に無料清掃を実施します。',
    cleaningRequest: 'タオル交換が必要な場合：朝10時までにドア裏の赤い札（「Change towels and Collect garbage」）をドア表面（廊下側）に貼ってください。バスマットはフロントでご用意します。',
    sheetExchange: 'アメニティとナイトウェアはロビー棚から自由にご利用いただけます。',
    noCleaning: '衛生清掃以外の追加清掃は有料です。朝10時までにフロントへお申し付けください。プレミアルーム 2,640円（税込）/1回、その他の客室 1,100円（税込）/1回。',
    officialHP: '公式HPはこちら',
    preparing: '詳細情報は準備中です。',
    dinnerCouponLine1: '今夜のご夕食にどうぞ',
    dinnerCouponLine2: 'お得な飲食店クーポン',
  },
  en: {
    hotelName: '',
    hotelTitle: 'Hotel Silk Tree Nagoya',
    heroTitle: 'Hotel Guide',
    welcomeMessage: 'Thank you very much for staying with us at Hotel Silk Tree Nagoya today.',
    welcomeMessage2: '',
    restaurantCoupon: 'Coupon',
    checkInOut: 'Check-in/Check-out',
    bath: 'Amenities',
    breakfast: 'Breakfast',
    dinner: 'Coupon',
    service: 'Floor Information',
    wifi: 'Wi-Fi',
    lighting: 'Room Lighting',
    longstay: 'Cleaning (Consecutive nights)',
    lost: 'Lost & Found',
    quickCheckin: 'Quick Check-in',
    dinnerTab: 'Coupon',
    serviceTab: 'Floor Information',
    close: 'Close',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    planNote: 'For inquiries, please contact the front desk (extension 333).',
    bbhMember: 'Silk Tree Members',
    earlyCheckin: 'Early Check-in',
    earlyCheckinFee: '1,000 yen per hour (until 14:00)',
    lobbyDesc1: 'An elegant lobby with European antique furnishings.',
    lobbyDesc2: 'A calm space where you can forget the hustle and bustle of the city.',
    lobbyDesc3: 'You can enter "Starbucks Coffee" directly from the lobby.',
    amenitiesTitle: 'Amenities & Nightwear',
    amenitiesNote: 'Amenities and nightwear are available at the lobby shelf. 1F Amenity buffet 14:00–25:00.',
    amenityTowel: 'Towel',
    amenityBathTowel: 'Bath towel',
    amenityDryer: 'Hair dryer',
    amenityDeodorant: 'Deodorizing spray',
    amenityShampoo: 'Shampoo',
    amenityConditioner: 'Conditioner',
    amenityHandSoap: 'Hand soap',
    amenityToothbrush: 'Toothbrush set',
    amenityBodySoap: 'Body soap',
    breakfastVenue: 'Breakfast Venue',
    breakfastFloor: '2F ALLY\'s Nagoya',
    breakfastTime: 'Operating Hours',
    breakfastTimeDetail: '6:30–9:30 (Order stop 9:00)',
    breakfastDesc: 'Two styles in one breakfast. European & Oriental style buffet.',
    breakfastCatchphrase: 'Enjoy Nagoya dishes, Japanese sides, bread, cereal, and more in your preferred style.',
    breakfastNotice: 'A breakfast ticket is required for entry. No entry in slippers.',
    bathTitle: 'Amenities',
    bathDescription: 'Available at the lobby shelf',
    operatingHours: 'Operating Hours:',
    bathHours: '15:00~Next day 10:00',
    saunaNote: '(Sauna only: 1:00~5:00 closed)',
    notice: 'Notice',
    bathNotice1: '*Please bring your own towels and amenities from your room.',
    bathNotice2: '*A passcode is required to enter the women\'s public bath. The passcode will be provided at the front desk.',
    freeService: 'Free Service',
    bathServiceDesc: 'We provide free lactic acid drinks and ice candy.',
    breakfastTitle: 'Breakfast (2F ALLY\'s Nagoya)',
    breakfastPrice: 'Adult ¥1,650 (tax incl.) / Child (elementary) ¥1,100 (tax incl.)',
    breakfastPriceLabel: 'Breakfast fee',
    breakfastHours: '6:30–9:30 (Order stop 9:00 / Last purchase 9:00)',
    breakfastPurchaseNote: '*Breakfast tickets are available at the front desk for same-day purchase.',
    breakfastPreschoolFree: '*Preschool children are free.',
    breakfastDetail: 'European-style corner with a variety of breads, fruit compote, ham, salad and more; Oriental corner with rice-based dishes, Nagoya specialties, Chinese and Asian items. Enjoy nozuke don (topping bowl), ochazuke, kishimen noodles, miso katsu, doteni, an-butter, bread & cereal, miso soup, daily soup, salad (5+ dressings), detox water, fruit tea, coffee and other drinks. Buffet items vary daily.',
    breakfastMenuNote: '*The buffet is offered on a daily rotating basis; not all menu items may be available.',
    breakfastNote1: '*You may be asked to wait if the restaurant is full.',
    breakfastNote2: '*Operating hours may change depending on congestion.',
    serviceTitle: 'Floor Information',
    floor1F: '■ 1F',
    freeSpaceNote: '',
    freeSpace: 'Welcome drink service',
    freeSpaceHours: '1F',
    microwave: 'Amenity buffet (14:00–25:00) 1F',
    iwateSachiko: 'Smoking corner (1F)',
    wrappingVending: 'Vending machines (1F, 3F)',
    souvenirVending1: 'Microwave (3F, 4F, 6F, 8F, 10F)',
    floor2F: '■ 3F',
    vendingMachine: 'Vending machines',
    iceMaker: 'Ice machine (3F, inside coin laundry)',
    vendingMachineNote: 'Comic corner (3F, English comics available)',
    laundry: 'Coin laundry (3F)',
    laundryHours: 'Detergent is auto-dispensed',
    alcoholNote: '(Alcoholic beverages: 5F, 9F)',
    smoking: 'Smoking corner (1F)',
    wifiTitle: 'Wi-Fi',
    password: 'Password:',
    wifiAccessPoint: 'SSID is "silktree". Password is "silktree". Wired LAN is not available.',
    copy: 'Copy',
    wifiCopyNote: '*Tap the button to copy the password.',
    passwordCopied: 'Copied!',
    lostTitle: 'Lost & Found',
    lostText1: 'If luggage or personal belongings are left behind at our hotel without a request for storage after checkout, they will be disposed of in accordance with hotel regulations, assuming the owner has discarded them.',
    lostText2: '',
    lostText3: '',
    lightingTitle: 'Room Lighting',
    lightingDesc: 'After entering the room, insert your room key holder into the power socket next to the entrance to turn on the room lighting.',
    lightingNote: '*Insert the key into the power socket.',
    longstayTitle: 'Cleaning (Consecutive nights)',
    cleaningHours: 'From an SDGs perspective, room cleaning during consecutive stays is generally suspended. Free cleaning is provided every 7 days for hygiene.',
    cleaningRequest: 'For towel exchange: Please place the red card ("Change towels and Collect garbage") on the corridor side of the door by 10:00. Bath mats are available at the front desk.',
    sheetExchange: 'Amenities and nightwear are available at the lobby shelf.',
    noCleaning: 'Additional cleaning (other than sanitary) is charged. Please request at the front desk by 10:00. Premium room ¥2,640 (tax incl.)/time; other rooms ¥1,100 (tax incl.)/time.',
    officialHP: 'Official Website',
    preparing: 'Detailed information is being prepared.',
    dinnerCouponLine1: 'For tonight\'s dinner',
    dinnerCouponLine2: 'Great restaurant coupons',
  },
  zh: {
    hotelName: '',
    hotelTitle: '名古屋丝绸树酒店',
    heroTitle: '酒店馆内指南',
    welcomeMessage: '感谢您今天入住「名古屋丝绸树酒店」。',
    welcomeMessage2: '',
    restaurantCoupon: '餐饮优惠券',
    checkInOut: '入住/退房时间',
    bath: '大堂・设施',
    breakfast: '早餐',
    dinner: '晚餐・优惠券',
    service: '馆内楼层指南',
    wifi: 'Wi-Fi',
    lighting: '室内照明',
    longstay: '连泊清扫',
    lost: '遗失物品',
    quickCheckin: '快速入住',
    dinnerTab: '晚餐・优惠券',
    serviceTab: '馆内楼层指南',
    close: '关闭',
    checkIn: '入住',
    checkOut: '退房',
    planNote: '※根据预订方案，时间可能有所不同。',
    bbhMember: 'BBH会员',
    earlyCheckin: '提前入住',
    earlyCheckinFee: '每小时1,000日元（最晚14:00）',
    lobbyDesc1: '欧式古董家具装饰的优雅大堂。',
    lobbyDesc2: '让您忘却都市喧嚣的宁静空间。',
    lobbyDesc3: '可从大堂直接进入"星巴克咖啡"。',
    breakfastVenue: '早餐会场',
    breakfastFloor: '2F ALLY\'s Nagoya',
    breakfastTime: '营业时间',
    breakfastTimeDetail: '6:30～9:30（点餐截止9:00）',
    breakfastDesc: '欧式与和式两种风格的自助早餐。欧洲&东方风格自助。',
    breakfastNotice: '营业时间可能会在不另行通知的情况下更改。',
    bathTitle: '大堂・设施',
    bathDescription: '男女分开大浴场 9F',
    operatingHours: '营业时间：',
    bathHours: '15:00~次日10:00',
    saunaNote: '(仅桑拿 1:00~5:00停止)',
    notice: '注意事项',
    bathNotice1: '※请自行从房间携带毛巾和洗漱用品。',
    bathNotice2: '※进入女性大浴场需要密码。密码将在前台提供。',
    freeService: '免费服务',
    bathServiceDesc: '我们免费提供乳酸菌饮料和冰棒。',
    breakfastTitle: '早餐（2F ALLY\'s Nagoya）',
    breakfastPrice: '成人 1,650日元（含税）／儿童（小学生）1,100日元（含税）',
    breakfastPriceLabel: '早餐费用',
    breakfastHours: '6:30～9:30（点餐截止9:00）',
    breakfastPurchaseNote: '※当日需用早餐的客人请在前台购买早餐券。',
    breakfastPreschoolFree: '※学龄前儿童免费。',
    breakfastDetail: '欧式角提供多种面包、果酱、火腿与沙拉等；和风角提供盖饭、茶泡饭、名古屋美食（ Kishimen、味噌猪排、Doteni、红豆黄油）及面包麦片、味噌汤、沙拉、饮品等自助。',
    breakfastMenuNote: '※自助菜单每日更换，部分菜品可能无法提供。',
    breakfastNote1: '※满座时可能需要等待。',
    breakfastNote2: '※根据拥挤情况，营业时间可能会有所调整。',
    serviceTitle: '馆内楼层指南',
    vendingMachine: '自动售货机',
    alcoholNote: '(酒精饮料在5・7・9F)',
    microwave: '1F 洗浴用品自助区（14:00～25:00）',
    iceMaker: '制冰机（3F 投币洗衣房内）',
    smoking: '吸烟区',
    trouserPress: '裤子熨烫机',
    trouserPressLocation: '各楼层电梯前',
    laundry: '投币式洗衣房',
    laundryNote: '※洗衣机/每次200日元 烘干机/10分钟100日元（洗涤剂在前台免费提供）',
    wifiTitle: 'Wi-Fi',
    password: '密码：',
    wifiAccessPoint: '请查看您房间内设置的「客房互联网指南」以了解接入点。',
    copy: '复制',
    wifiCopyNote: '※点击按钮即可复制密码',
    passwordCopied: '密码已复制！',
    lostTitle: '遗失物品',
    lostText1: '原则上，酒店不会就遗失物品联系客人。',
    lostText2: '如果没有联系，根据遗失物品法，将在3个月后处理。',
    lostText3: '但是，食品饮料将在当天处理。',
    lightingTitle: '室内照明',
    lightingDesc: '进入房间后，将房间钥匙扣插入入口旁的电源插座即可点亮室内照明。',
    lightingNote: '※将钥匙插入电源插座。',
    longstayTitle: '连泊清扫说明',
    cleaningHours: '出于SDGs理念，连住期间原则上不进行客房清扫。为保持卫生，每7天提供一次免费清扫。',
    cleaningRequest: '需要更换毛巾时：请于10:00前将红色标牌（「Change towels and Collect garbage」）贴在房门走廊一侧。浴垫请至前台领取。',
    sheetExchange: '洗浴用品与睡衣请在一楼大堂置物架自由取用。',
    noCleaning: '卫生清扫以外的额外清扫为收费服务。请于10:00前至前台申请。尊享房每次2,640日元（含税），其他房型每次1,100日元（含税）。',
    officialHP: '官方网站',
    preparing: '详细信息正在准备中。',
    dinnerCouponLine1: '今晚的晚餐',
    dinnerCouponLine2: '超值餐饮优惠券',
    amenitiesTitle: '全部屋类型共通',
    amenitiesNote: '※设施用品在1楼准备。',
    amenityTowel: '毛巾',
    amenityBathTowel: '浴巾',
    amenityDryer: '吹风机',
    amenityDeodorant: '除臭喷雾',
    amenityShampoo: '洗发水',
    amenityConditioner: '护发素',
    amenityHandSoap: '洗手液',
    amenityToothbrush: '牙刷套装',
    amenityBodySoap: '沐浴露',
    floor1F: '■ 1F',
    floor2F: '■ 3F',
    freeSpaceNote: '',
    freeSpace: '迎宾饮料服务',
    freeSpaceHours: '1F',
    iwateSachiko: '吸烟区 1F',
    wrappingVending: '自动售货机 1F・3F',
    souvenirVending1: '微波炉 3F・4F・6F・8F・10F',
    vendingMachineNote: '漫画角 3F（备有英文漫画）',
    laundryHours: '洗涤剂自动投入。',
  },
  ko: {
    hotelName: '',
    hotelTitle: '호텔 실크 트리 나고야',
    heroTitle: '호텔 관내 안내',
    welcomeMessage: '오늘 "호텔 실크 트리 나고야"를 이용해 주셔서 진심으로 감사드립니다.',
    welcomeMessage2: '',
    restaurantCoupon: '음식점 쿠폰',
    checkInOut: '입실/퇴실 시간',
    bath: '로비・시설',
    breakfast: '조식',
    dinner: '석식・할인 쿠폰',
    service: '관내 층별 안내',
    wifi: 'Wi-Fi',
    lighting: '실내 조명',
    longstay: '연박 청소',
    lost: '분실물 안내',
    quickCheckin: '빠른 체크인',
    dinnerTab: '석식・할인 쿠폰',
    serviceTab: '관내 층별 안내',
    close: '닫기',
    checkIn: '체크인',
    checkOut: '체크아웃',
    planNote: '※플랜에 따라 시간이 다를 수 있습니다.',
    bbhMember: 'BBH 회원',
    earlyCheckin: '얼리 체크인',
    earlyCheckinFee: '시간당 1,000엔 (최대 14:00까지)',
    lobbyDesc1: '유럽풍 앤티크 가구가 우아한 로비.',
    lobbyDesc2: '도시의 번잡함을 잊게 하는 편안한 공간입니다.',
    lobbyDesc3: '"스타벅스 커피"는 로비에서 직접 입장하실 수 있습니다.',
    breakfastVenue: '조식 장소',
    breakfastFloor: '2F ALLY\'s Nagoya',
    breakfastTime: '운영 시간',
    breakfastTimeDetail: '6:30～9:30 (오더 스탑 9:00)',
    breakfastDesc: '유럽식과 오리엔탈 두 가지 스타일의 조식 뷔페. European & Oriental style buffet.',
    breakfastNotice: '운영 시간은 예고 없이 변경될 수 있습니다.',
    bathTitle: '로비・시설',
    bathDescription: '남녀 분리 대욕장 9F',
    operatingHours: '운영 시간:',
    bathHours: '15:00~다음날 10:00',
    saunaNote: '(사우나만 1:00~5:00 정지)',
    notice: '주의사항',
    bathNotice1: '※타월과 어메니티는 각자 객실에서 가져오세요.',
    bathNotice2: '※여성 대욕장 입장 시 비밀번호가 필요합니다. 비밀번호는 프런트에서 제공합니다.',
    freeService: '무료 서비스',
    bathServiceDesc: '유산균 음료와 아이스 캔디를 무료로 제공합니다.',
    breakfastTitle: '조식 (2F ALLY\'s Nagoya)',
    breakfastPrice: '성인 1,650엔(세금 포함) / 어린이(초등학생) 1,100엔(세금 포함)',
    breakfastPriceLabel: '조식 요금',
    breakfastHours: '6:30～9:30 (오더 스탑 9:00)',
    breakfastPurchaseNote: '※당일 조식은 프런트에서 식권을 판매합니다.',
    breakfastPreschoolFree: '※미취학 아동 무료.',
    breakfastDetail: '유럽식 코너(빵·잼·햄·샐러드 등)와 오리엔탈 코너(덮밥·차즈케·기시멘·미소카츠·도테니·앙버터 등) 뷔페. 빵·시리얼·미소국·일일 스프·샐러드·드링크 풍부.',
    breakfastMenuNote: '※뷔페는 일일 교체로 모든 메뉴가 준비되지 않을 수 있습니다.',
    breakfastNote1: '※만석일 경우 대기하셔야 할 수 있습니다.',
    breakfastNote2: '※혼잡 상황에 따라 영업 시간이 변경될 수 있습니다.',
    serviceTitle: '관내 층별 안내',
    vendingMachine: '자동판매기',
    alcoholNote: '(주류는 5・7・9F)',
    microwave: '1F 어메니티 뷔페（14:00～25:00）',
    iceMaker: '제빙기（3F 코인 세탁소 내）',
    smoking: '흡연 코너',
    trouserPress: '바지 다림질기',
    trouserPressLocation: '각 층 엘리베이터 앞',
    laundry: '코인 세탁소',
    laundryNote: '※세탁기/1회 200엔 건조기/10분 100엔 (세제는 프런트에서 무료 배포)',
    wifiTitle: 'Wi-Fi',
    password: '비밀번호:',
    wifiAccessPoint: '액세스 포인트는 객실에 설치된「객실 인터넷 안내」를 참고해 주세요.',
    copy: '복사',
    wifiCopyNote: '※버튼을 탭하면 비밀번호를 복사할 수 있습니다',
    passwordCopied: '비밀번호를 복사했습니다!',
    lostTitle: '분실물',
    lostText1: '분실물에 대해서는 원칙적으로 호텔에서 연락하지 않습니다.',
    lostText2: '또한 연락이 없는 경우 유실물법에 따라 3개월 경과 후 처분됩니다.',
    lostText3: '단, 음식물에 대해서는 당일 처분됩니다.',
    lightingTitle: '실내 조명',
    lightingDesc: '입실 후 입구 옆 전원 소켓에 객실 키홀더를 꽂으면 실내 조명이 켜집니다.',
    lightingNote: '※키를 전원 소켓에 꽂습니다.',
    longstayTitle: '연박 청소 안내',
    cleaningHours: 'SDGs 관점에서 연박 시 객실 청소는 원칙적으로 생략됩니다. 위생 관리를 위해 7일마다 무료 청소를 실시합니다.',
    cleaningRequest: '타월 교환이 필요한 경우: 10:00까지 문 안쪽의 빨간 카드（「Change towels and Collect garbage」）를 문의 복도 쪽 면에 붙여 주세요. 배스매트는 프런트에서 받으실 수 있습니다.',
    sheetExchange: '어메니티와 나이트웨어는 로비 선반에서 자유롭게 이용하실 수 있습니다.',
    noCleaning: '위생 청소 외 추가 청소는 유료입니다. 10:00까지 프런트에 신청해 주세요. 프리미엄 룸 2,640엔（세금 포함）/1회, 그 외 객실 1,100엔（세금 포함）/1회입니다.',
    officialHP: '공식 홈페이지',
    preparing: '상세 정보를 준비 중입니다.',
    dinnerCouponLine1: '오늘 밤 저녁식사',
    dinnerCouponLine2: '특가 음식점 쿠폰',
    amenitiesTitle: '전 객실 타입 공통',
    amenitiesNote: '※어메니티는 1F에 준비되어 있습니다.',
    amenityTowel: '타월',
    amenityBathTowel: '목욕 타월',
    amenityDryer: '드라이어',
    amenityDeodorant: '탈취 스프레이',
    amenityShampoo: '샴푸',
    amenityConditioner: '린스',
    amenityHandSoap: '핸드 소프',
    amenityToothbrush: '양치 세트',
    amenityBodySoap: '바디 소프',
    floor1F: '■ 1F',
    floor2F: '■ 3F',
    freeSpaceNote: '',
    freeSpace: '웰컴 드링크 서비스',
    freeSpaceHours: '1F',
    iwateSachiko: '흡연실 1F',
    wrappingVending: '자동판매기 1F・3F',
    souvenirVending1: '전자레인지 3F・4F・6F・8F・10F',
    vendingMachineNote: '만화 코너 3F（영어 만화도 있습니다）',
    laundryHours: '세제는 자동 투입됩니다.',
  },
  fr: {
    hotelName: '',
    hotelTitle: 'Hotel Silk Tree Nagoya',
    heroTitle: 'Guide de l\'hôtel',
    welcomeMessage: 'Merci beaucoup d\'avoir séjourné au Hotel Silk Tree Nagoya aujourd\'hui.',
    welcomeMessage2: '',
    restaurantCoupon: 'Coupon Restaurant',
    checkInOut: 'Enregistrement/Départ',
    bath: 'Bain public',
    breakfast: 'Petit-déjeuner',
    dinner: 'Dîner & Coupons',
    service: 'Étages & équipements',
    wifi: 'Wi-Fi',
    lighting: 'Éclairage intérieur',
    longstay: 'Ménage (séjours consécutifs)',
    lost: 'Objets trouvés',
    quickCheckin: 'Check-in rapide',
    dinnerTab: 'Dîner & Coupons',
    serviceTab: 'Étages & équipements',
    close: 'Fermer',
    checkIn: 'Enregistrement',
    checkOut: 'Départ',
    planNote: '*Les heures peuvent varier selon le plan.',
    bbhMember: 'Membre BBH',
    earlyCheckin: 'Enregistrement anticipé',
    earlyCheckinFee: '1 000 yens par heure (jusqu\'à 14h00)',
    lobbyDesc1: 'Un hall élégant avec des meubles anciens européens.',
    lobbyDesc2: 'Un espace calme où vous pouvez oublier l\'agitation de la ville.',
    lobbyDesc3: 'Vous pouvez entrer dans "Starbucks Coffee" directement depuis le hall.',
    breakfastVenue: 'Lieu du petit-déjeuner',
    breakfastFloor: '10ème étage',
    breakfastTime: 'Horaires',
    breakfastTimeDetail: '6:45～9:00 (dernière entrée 8:45)',
    breakfastDesc: 'Profitez d\'un buffet petit-déjeuner nutritif avec des ingrédients locaux.',
    breakfastNotice: 'Les horaires sont susceptibles de changer sans préavis.',
    bathTitle: 'Bain public',
    bathDescription: 'Bain public séparé hommes/femmes 9F',
    operatingHours: 'Heures d\'ouverture:',
    bathHours: '15:00~Le lendemain 10:00',
    saunaNote: '(Sauna uniquement: 1:00~5:00 fermé)',
    notice: 'Avis',
    bathNotice1: '*Veuillez apporter vos propres serviettes et articles de toilette depuis votre chambre.',
    bathNotice2: '*Un code d\'accès est requis pour entrer dans le bain public des femmes. Le code sera fourni à la réception.',
    freeService: 'Service gratuit',
    bathServiceDesc: 'Nous fournissons gratuitement des boissons lactiques et des bonbons glacés.',
    breakfastTitle: 'Petit-déjeuner (2F ALLY\'s Nagoya)',
    breakfastPrice: 'Adulte 1 650 ¥ (TTC) / Enfant (primaire) 1 100 ¥ (TTC)',
    breakfastPriceLabel: 'Tarif petit-déjeuner',
    breakfastHours: '6:30～9:30 (Arrêt des commandes 9:00)',
    breakfastPurchaseNote: '*Les tickets petit-déjeuner sont en vente à la réception le jour même.',
    breakfastPreschoolFree: '*Gratuit pour les enfants d\'âge préscolaire.',
    breakfastDetail: 'Buffet style européen et oriental : pains, confiture, jambon, salades, donburi, ochazuke, spécialités de Nagoya (kishimen, miso katsu, doteni, an-butter), soupe miso, boissons.',
    breakfastMenuNote: '*Le buffet varie selon les jours ; tous les plats ne sont pas toujours disponibles.',
    breakfastNote1: '*Vous pourriez être invité à attendre si le restaurant est complet.',
    breakfastNote2: '*Les heures d\'ouverture peuvent changer selon l\'affluence.',
    serviceTitle: 'Étages & équipements',
    vendingMachine: 'Distributeurs automatiques',
    alcoholNote: '(Boissons alcoolisées: 5F, 9F)',
    microwave: 'Buffet d\'amenities (14h00–25h00) 1F',
    iceMaker: 'Machine à glaçons (3F, dans la laverie à pièces)',
    smoking: 'Espace fumeur',
    trouserPress: 'Presse-pantalon',
    trouserPressLocation: 'Devant l\'ascenseur à chaque étage',
    laundry: 'Laverie automatique',
    laundryNote: '*Détergent, machine à laver/gratuit, sèche-linge/payant (¥100 par 30 minutes)',
    wifiTitle: 'Wi-Fi',
    password: 'Mot de passe:',
    wifiAccessPoint: 'Veuillez consulter le "Guide Internet de la chambre" installé dans votre chambre pour le point d\'accès.',
    copy: 'Copier',
    wifiCopyNote: '※Vous pouvez copier le mot de passe en appuyant sur le bouton',
    passwordCopied: 'Mot de passe copié !',
    lostTitle: 'Objets trouvés',
    lostText1: 'En principe, l\'hôtel ne vous contactera pas concernant les objets perdus.',
    lostText2: 'Si non contact, les objets seront éliminés après 3 mois conformément à la Loi sur les objets perdus.',
    lostText3: 'Cependant, les aliments et boissons seront éliminés le jour même.',
    lightingTitle: 'Éclairage intérieur',
    lightingDesc: 'Après être entré dans la chambre, insérez le porte-clés de votre chambre dans la prise électrique à côté de l\'entrée pour allumer l\'éclairage de la chambre.',
    lightingNote: '*Insérez la clé dans la prise électrique.',
    longstayTitle: 'Ménage (séjours consécutifs)',
    cleaningHours: 'Dans une logique de développement durable, le ménage quotidien est en principe suspendu pendant les séjours consécutifs. Un ménage gratuit est assuré tous les 7 jours pour des raisons d\'hygiène.',
    cleaningRequest: 'Pour un échange de serviettes : veuillez placer la carte rouge (« Change towels and Collect garbage ») du côté couloir de la porte avant 10h00. Tapis de bain disponibles à la réception.',
    sheetExchange: 'Les amenities et vêtements de nuit sont disponibles sur l\'étagère du hall.',
    noCleaning: 'Un ménage supplémentaire (autre que sanitaire) est payant. Merci de vous adresser à la réception avant 10h00. Chambre Premium : 2 640 ¥ (TTC) / fois ; autres chambres : 1 100 ¥ (TTC) / fois.',
    officialHP: 'Site Web officiel',
    preparing: 'Les informations détaillées sont en cours de préparation.',
    dinnerCouponLine1: 'Pour le dîner de ce soir',
    dinnerCouponLine2: 'Coupons restaurant exceptionnels',
    amenitiesTitle: 'Commun à tous les types de chambres',
    amenitiesNote: '※Les équipements sont disponibles au 1er étage.',
    amenityTowel: 'Serviette',
    amenityBathTowel: 'Serviette de bain',
    amenityDryer: 'Sèche-cheveux',
    amenityDeodorant: 'Spray désodorisant',
    amenityShampoo: 'Shampooing',
    amenityConditioner: 'Après-shampooing',
    amenityHandSoap: 'Savon pour les mains',
    amenityToothbrush: 'Set de brossage',
    amenityBodySoap: 'Savon pour le corps',
    floor1F: '■ 1F',
    floor2F: '■ 3F',
    freeSpaceNote: '',
    freeSpace: 'Boissons de bienvenue',
    freeSpaceHours: '1F',
    iwateSachiko: 'Espace fumeurs (1F)',
    wrappingVending: 'Distributeurs automatiques (1F, 3F)',
    souvenirVending1: 'Micro-ondes (3F, 4F, 6F, 8F, 10F)',
    vendingMachineNote: 'Coin manga (3F, mangas en anglais disponibles)',
    laundryHours: 'Lessive automatiquement dosée.',
  },
  de: {
    hotelName: '',
    hotelTitle: 'Hotel Silk Tree Nagoya',
    heroTitle: 'Hotel-Führer',
    welcomeMessage: 'Vielen Dank, dass Sie heute im Hotel Silk Tree Nagoya bei uns übernachtet haben.',
    welcomeMessage2: '',
    restaurantCoupon: 'Restaurant-Gutschein',
    checkInOut: 'Check-in/Check-out',
    bath: 'Öffentliches Bad',
    breakfast: 'Frühstück',
    dinner: 'Abendessen & Gutscheine',
    service: 'Etagen & Ausstattung',
    wifi: 'Wi-Fi',
    lighting: 'Raumbeleuchtung',
    longstay: 'Reinigung (Mehrfachübernachtung)',
    lost: 'Fundsachen',
    quickCheckin: 'Schnell-Check-in',
    dinnerTab: 'Abendessen & Gutscheine',
    serviceTab: 'Etagen & Ausstattung',
    close: 'Schließen',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    planNote: '*Die Zeiten können je nach Plan variieren.',
    bbhMember: 'BBH-Mitglied',
    earlyCheckin: 'Früher Check-in',
    earlyCheckinFee: '1.000 Yen pro Stunde (bis 14:00 Uhr)',
    lobbyDesc1: 'Eine elegante Lobby mit europäischen Antikmöbeln.',
    lobbyDesc2: 'Ein ruhiger Raum, in dem Sie die Hektik der Stadt vergessen können.',
    lobbyDesc3: 'Sie können "Starbucks Coffee" direkt von der Lobby aus betreten.',
    breakfastVenue: 'Frühstücksort',
    breakfastFloor: '10. Stock',
    breakfastTime: 'Öffnungszeiten',
    breakfastTimeDetail: '6:45～9:00 (letzter Einlass 8:45)',
    breakfastDesc: 'Genießen Sie ein nahrhaftes Frühstücksbuffet mit lokalen Zutaten.',
    breakfastNotice: 'Die Öffnungszeiten können ohne Vorankündigung geändert werden.',
    bathTitle: 'Öffentliches Bad',
    bathDescription: 'Getrenntes Männer- und Frauenbad 9F',
    operatingHours: 'Öffnungszeiten:',
    bathHours: '15:00~Nächster Tag 10:00',
    saunaNote: '(Nur Sauna: 1:00~5:00 geschlossen)',
    notice: 'Hinweis',
    bathNotice1: '*Bitte bringen Sie Ihre eigenen Handtücher und Toilettenartikel aus Ihrem Zimmer mit.',
    bathNotice2: '*Ein Passcode ist erforderlich, um das Frauenbad zu betreten. Der Passcode wird an der Rezeption bereitgestellt.',
    freeService: 'Kostenloser Service',
    bathServiceDesc: 'Wir bieten kostenlos Milchsäuregetränke und Eisbonbons an.',
    breakfastTitle: 'Frühstück (2F ALLY\'s Nagoya)',
    breakfastPrice: 'Erwachsene 1.650 ¥ (inkl. MwSt.) / Kind (Grundschule) 1.100 ¥ (inkl. MwSt.)',
    breakfastPriceLabel: 'Frühstücksgebühr',
    breakfastHours: '6:30～9:30 (Bestellschluss 9:00)',
    breakfastPurchaseNote: '*Frühstückstickets sind an der Rezeption am selben Tag erhältlich.',
    breakfastPreschoolFree: '*Vorschulkinder frei.',
    breakfastDetail: 'Europäische & orientalische Buffet: Brot, Konfitüre, Schinken, Salat, Donburi, Ochazuke, Nagoya-Spezialitäten (Kishimen, Miso-Katsu, Doteni, An-Butter), Misosuppe, Getränke.',
    breakfastMenuNote: '*Das Buffet wechselt tagesweise; nicht alle Gerichte sind immer verfügbar.',
    breakfastNote1: '*Sie könnten gebeten werden zu warten, wenn das Restaurant voll ist.',
    breakfastNote2: '*Die Öffnungszeiten können sich je nach Andrang ändern.',
    serviceTitle: 'Etagen & Ausstattung',
    vendingMachine: 'Automaten',
    alcoholNote: '(Alkoholische Getränke: 5F, 9F)',
    microwave: 'Amenity-Buffet (14:00–25:00) 1F',
    iceMaker: 'Eismaschine (3F, im Münzwaschsalon)',
    smoking: 'Raucherbereich',
    trouserPress: 'Hosenpresse',
    trouserPressLocation: 'Vor dem Aufzug auf jeder Etage',
    laundry: 'Münzwaschsalon',
    laundryNote: '*Waschmittel, Waschmaschine/kostenlos, Trockner/gebührenpflichtig (¥100 pro 30 Minuten)',
    wifiTitle: 'Wi-Fi',
    password: 'Passwort:',
    wifiAccessPoint: 'Bitte überprüfen Sie den "Gästezimmer-Internetführer" in Ihrem Zimmer für den Zugangspunkt.',
    copy: 'Kopieren',
    wifiCopyNote: '※Sie können das Passwort durch Tippen auf die Schaltfläche kopieren',
    passwordCopied: 'Passwort kopiert!',
    lostTitle: 'Fundsachen',
    lostText1: 'Grundsätzlich wird das Hotel Sie nicht bezüglich verlorener Gegenstände kontaktieren.',
    lostText2: 'Wenn kein Kontakt besteht, werden die Gegenstände nach 3 Monaten gemäß dem Fundrecht entsorgt.',
    lostText3: 'Lebensmittel und Getränke werden jedoch am selben Tag entsorgt.',
    lightingTitle: 'Raumbeleuchtung',
    lightingDesc: 'Nach dem Betreten des Zimmers stecken Sie den Zimmerschlüsselhalter in die Steckdose neben dem Eingang, um die Raumbeleuchtung einzuschalten.',
    lightingNote: '*Stecken Sie den Schlüssel in die Steckdose.',
    longstayTitle: 'Reinigung (Mehrfachübernachtung)',
    cleaningHours: 'Aus SDG-Sicht entfällt die tägliche Zimmerreinigung bei aufeinanderfolgenden Nächten in der Regel. Aus hygienischen Gründen erfolgt alle 7 Tage eine kostenlose Reinigung.',
    cleaningRequest: 'Zum Handtuchwechsel: Bitte befestigen Sie bis 10:00 Uhr die rote Karte („Change towels and Collect garbage“) auf der Korridor-Seite der Tür. Badematten erhalten Sie an der Rezeption.',
    sheetExchange: 'Amenities und Nachtwäsche finden Sie am Regal in der Lobby.',
    noCleaning: 'Zusätzliche Reinigung (außer der sanitären) ist kostenpflichtig. Bitte melden Sie sich bis 10:00 Uhr an der Rezeption. Premiumzimmer 2.640 ¥ (inkl. MwSt.)/Vorgang; andere Zimmer 1.100 ¥ (inkl. MwSt.)/Vorgang.',
    officialHP: 'Offizielle Website',
    preparing: 'Detaillierte Informationen werden vorbereitet.',
    dinnerCouponLine1: 'Für das Abendessen heute',
    dinnerCouponLine2: 'Großartige Restaurant-Gutscheine',
    amenitiesTitle: 'Gemeinsam für alle Zimmertypen',
    amenitiesNote: '※Die Ausstattung ist im 1. Stock verfügbar.',
    amenityTowel: 'Handtuch',
    amenityBathTowel: 'Badetuch',
    amenityDryer: 'Haartrockner',
    amenityDeodorant: 'Deodorantspray',
    amenityShampoo: 'Shampoo',
    amenityConditioner: 'Conditioner',
    amenityHandSoap: 'Handseife',
    amenityToothbrush: 'Zahnbürstenset',
    amenityBodySoap: 'Körperseife',
    floor1F: '■ 1F',
    floor2F: '■ 3F',
    freeSpaceNote: '',
    freeSpace: 'Willkommensgetränk',
    freeSpaceHours: '1F',
    iwateSachiko: 'Raucherbereich (1F)',
    wrappingVending: 'Automaten (1F, 3F)',
    souvenirVending1: 'Mikrowelle (3F, 4F, 6F, 8F, 10F)',
    vendingMachineNote: 'Manga-Ecke (3F, englische Comics verfügbar)',
    laundryHours: 'Waschmittel wird automatisch dosiert.',
  },
  es: {
    hotelName: '',
    hotelTitle: 'Hotel Silk Tree Nagoya',
    heroTitle: 'Guía del hotel',
    welcomeMessage: 'Muchas gracias por alojarse hoy en el Hotel Silk Tree Nagoya.',
    welcomeMessage2: '',
    restaurantCoupon: 'Cupón de restaurante',
    checkInOut: 'Registro/Salida',
    bath: 'Baño público',
    breakfast: 'Desayuno',
    dinner: 'Cena & Cupones',
    service: 'Planta & instalaciones',
    wifi: 'Wi-Fi',
    lighting: 'Iluminación interior',
    longstay: 'Limpieza (estancias consecutivas)',
    lost: 'Objetos perdidos',
    quickCheckin: 'Check-in rápido',
    dinnerTab: 'Cena & Cupones',
    serviceTab: 'Planta & instalaciones',
    close: 'Cerrar',
    checkIn: 'Registro',
    checkOut: 'Salida',
    planNote: '*Los horarios pueden variar según el plan.',
    bbhMember: 'Miembro BBH',
    earlyCheckin: 'Check-in temprano',
    earlyCheckinFee: '1.000 yenes por hora (hasta las 14:00)',
    lobbyDesc1: 'Un vestíbulo elegante con muebles antiguos europeos.',
    lobbyDesc2: 'Un espacio tranquilo donde puede olvidar el ajetreo de la ciudad.',
    lobbyDesc3: 'Puede entrar a "Starbucks Coffee" directamente desde el vestíbulo.',
    breakfastVenue: 'Lugar del desayuno',
    breakfastFloor: 'Piso 10',
    breakfastTime: 'Horario',
    breakfastTimeDetail: '6:45～9:00 (última entrada 8:45)',
    breakfastDesc: 'Disfrute de un buffet de desayuno nutritivo con ingredientes locales.',
    breakfastNotice: 'El horario está sujeto a cambios sin previo aviso.',
    bathTitle: 'Baño público',
    bathDescription: 'Baño público separado para hombres y mujeres 9F',
    operatingHours: 'Horario de funcionamiento:',
    bathHours: '15:00~Día siguiente 10:00',
    saunaNote: '(Solo sauna: 1:00~5:00 cerrado)',
    notice: 'Aviso',
    bathNotice1: '*Por favor traiga sus propias toallas y artículos de aseo desde su habitación.',
    bathNotice2: '*Se requiere un código de acceso para entrar al baño público de mujeres. El código se proporcionará en la recepción.',
    freeService: 'Servicio gratuito',
    bathServiceDesc: 'Ofrecemos gratuitamente bebidas lácteas y caramelos de hielo.',
    breakfastTitle: 'Desayuno (2F ALLY\'s Nagoya)',
    breakfastPrice: 'Adulto 1.650 ¥ (iva incl.) / Niño (primaria) 1.100 ¥ (iva incl.)',
    breakfastPriceLabel: 'Precio del desayuno',
    breakfastHours: '6:30～9:30 (Último pedido 9:00)',
    breakfastPurchaseNote: '*Los tickets de desayuno se venden en recepción el mismo día.',
    breakfastPreschoolFree: '*Niños en edad preescolar gratis.',
    breakfastDetail: 'Buffet europeo y oriental: pan, mermelada, jamón, ensalada, donburi, ochazuke, especialidades de Nagoya (kishimen, miso katsu, doteni), sopa miso, bebidas.',
    breakfastMenuNote: '*El buffet varía según el día; no todos los platos están siempre disponibles.',
    breakfastNote1: '*Es posible que se le pida que espere si el restaurante está lleno.',
    breakfastNote2: '*El horario puede cambiar según la congestión.',
    serviceTitle: 'Planta & instalaciones',
    vendingMachine: 'Máquinas expendedoras',
    alcoholNote: '(Bebidas alcohólicas: 5F, 9F)',
    microwave: 'Buffet de amenities (14:00–25:00) 1F',
    iceMaker: 'Máquina de hielo (3F, dentro de la lavandería de monedas)',
    smoking: 'Área de fumadores',
    trouserPress: 'Prensa de pantalones',
    trouserPressLocation: 'Frente al ascensor en cada piso',
    laundry: 'Lavandería de monedas',
    laundryNote: '*Detergente, lavadora/gratis, secadora/de pago (¥100 por 30 minutos)',
    wifiTitle: 'Wi-Fi',
    password: 'Contraseña:',
    wifiAccessPoint: 'Por favor, consulte la "Guía de Internet de la Habitación" instalada en su habitación para el punto de acceso.',
    copy: 'Copiar',
    wifiCopyNote: '※Puede copiar la contraseña tocando el botón',
    passwordCopied: '¡Contraseña copiada!',
    lostTitle: 'Objetos perdidos',
    lostText1: 'Como regla, el hotel no se pondrá en contacto con usted sobre objetos perdidos.',
    lostText2: 'Si no hay contacto, los objetos se eliminarán después de 3 meses de acuerdo con la Ley de Objetos Perdidos.',
    lostText3: 'Sin embargo, los alimentos y bebidas se eliminarán el mismo día.',
    lightingTitle: 'Iluminación interior',
    lightingDesc: 'Después de entrar en la habitación, inserte el portallaves de su habitación en el enchufe eléctrico junto a la entrada para encender la iluminación de la habitación.',
    lightingNote: '*Inserte la llave en el enchufe eléctrico.',
    longstayTitle: 'Limpieza (estancias consecutivas)',
    cleaningHours: 'Por sostenibilidad, la limpieza diaria de la habitación suele suspenderse durante estancias consecutivas. Por higiene, se ofrece limpieza gratuita cada 7 días.',
    cleaningRequest: 'Para cambio de toallas: coloque la tarjeta roja («Change towels and Collect garbage») en el lado del pasillo de la puerta antes de las 10:00. Alfombras de baño en recepción.',
    sheetExchange: 'Amenities y ropa de dormir están disponibles en la estantería del vestíbulo.',
    noCleaning: 'La limpieza adicional (distinta de la sanitaria) es de pago. Solicítela en recepción antes de las 10:00. Habitación Premium: 2.640 ¥ (IVA incl.)/vez; otras habitaciones: 1.100 ¥ (IVA incl.)/vez.',
    officialHP: 'Sitio web oficial',
    preparing: 'La información detallada se está preparando.',
    dinnerCouponLine1: 'Para la cena de esta noche',
    dinnerCouponLine2: 'Cupones de restaurante excelentes',
    amenitiesTitle: 'Común a todos los tipos de habitación',
    amenitiesNote: '※Los equipamientos están disponibles en el 1er piso.',
    amenityTowel: 'Toalla',
    amenityBathTowel: 'Toalla de baño',
    amenityDryer: 'Secador de pelo',
    amenityDeodorant: 'Spray desodorante',
    amenityShampoo: 'Champú',
    amenityConditioner: 'Acondicionador',
    amenityHandSoap: 'Jabón de manos',
    amenityToothbrush: 'Set de cepillado',
    amenityBodySoap: 'Jabón corporal',
    floor1F: '■ 1F',
    floor2F: '■ 3F',
    freeSpaceNote: '',
    freeSpace: 'Bebida de bienvenida',
    freeSpaceHours: '1F',
    iwateSachiko: 'Zona de fumadores (1F)',
    wrappingVending: 'Máquinas expendedoras (1F, 3F)',
    souvenirVending1: 'Microondas (3F, 4F, 6F, 8F, 10F)',
    vendingMachineNote: 'Rincón de cómics (3F, hay cómics en inglés)',
    laundryHours: 'El detergente se dosifica automáticamente.',
  },
  it: {
    hotelName: '',
    hotelTitle: 'Hotel Silk Tree Nagoya',
    heroTitle: 'Guida dell\'hotel',
    welcomeMessage: 'Grazie mille per aver soggiornato oggi all\'Hotel Silk Tree Nagoya.',
    welcomeMessage2: '',
    restaurantCoupon: 'Buono ristorante',
    checkInOut: 'Check-in/Check-out',
    bath: 'Bagno pubblico',
    breakfast: 'Colazione',
    dinner: 'Cena & Buoni',
    service: 'Piani & dotazioni',
    wifi: 'Wi-Fi',
    lighting: 'Illuminazione interna',
    longstay: 'Pulizia (soggiorni consecutivi)',
    lost: 'Oggetti smarriti',
    quickCheckin: 'Check-in rapido',
    dinnerTab: 'Cena & Buoni',
    serviceTab: 'Piani & dotazioni',
    close: 'Chiudi',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    planNote: '*Gli orari possono variare a seconda del piano.',
    bbhMember: 'Membro BBH',
    earlyCheckin: 'Check-in anticipato',
    earlyCheckinFee: '1.000 yen all\'ora (fino alle 14:00)',
    lobbyDesc1: 'Una hall elegante con mobili antichi europei.',
    lobbyDesc2: 'Uno spazio tranquillo dove puoi dimenticare il trambusto della città.',
    lobbyDesc3: 'Puoi entrare in "Starbucks Coffee" direttamente dalla hall.',
    breakfastVenue: 'Luogo della colazione',
    breakfastFloor: '10° piano',
    breakfastTime: 'Orario',
    breakfastTimeDetail: '6:45～9:00 (ultimo ingresso 8:45)',
    breakfastDesc: 'Goditi un buffet per colazione nutriente con ingredienti locali.',
    breakfastNotice: 'Gli orari sono soggetti a modifiche senza preavviso.',
    bathTitle: 'Bagno pubblico',
    bathDescription: 'Bagno pubblico separato uomini/donne 9F',
    operatingHours: 'Orari di apertura:',
    bathHours: '15:00~Giorno successivo 10:00',
    saunaNote: '(Solo sauna: 1:00~5:00 chiuso)',
    notice: 'Avviso',
    bathNotice1: '*Si prega di portare i propri asciugamani e articoli da toilette dalla propria camera.',
    bathNotice2: '*È richiesto un codice di accesso per entrare nel bagno pubblico delle donne. Il codice verrà fornito alla reception.',
    freeService: 'Servizio gratuito',
    bathServiceDesc: 'Forniamo gratuitamente bevande lattiche e caramelle ghiacciate.',
    breakfastTitle: 'Colazione (2F ALLY\'s Nagoya)',
    breakfastPrice: 'Adulto 1.650 ¥ (IVA incl.) / Bambino (scuola elem.) 1.100 ¥ (IVA incl.)',
    breakfastPriceLabel: 'Prezzo colazione',
    breakfastHours: '6:30～9:30 (Stop ordini 9:00)',
    breakfastPurchaseNote: '*I biglietti per la colazione sono in vendita alla reception il giorno stesso.',
    breakfastPreschoolFree: '*Bambini in età prescolastica gratis.',
    breakfastDetail: 'Buffet stile europeo e orientale: pane, confettura, prosciutto, insalata, donburi, ochazuke, specialità di Nagoya (kishimen, miso katsu, doteni), zuppa miso, bevande.',
    breakfastMenuNote: '*Il buffet varia a seconda del giorno; non tutti i piatti sono sempre disponibili.',
    breakfastNote1: '*Potrebbe essere richiesto di attendere se il ristorante è pieno.',
    breakfastNote2: '*Gli orari di apertura possono cambiare a seconda della congestione.',
    serviceTitle: 'Piani & dotazioni',
    vendingMachine: 'Distributori automatici',
    alcoholNote: '(Beveraggi alcolici: 5F, 9F)',
    microwave: 'Buffet amenities (14:00–25:00) 1F',
    iceMaker: 'Macchina del ghiaccio (3F, dentro la lavanderia a gettoni)',
    smoking: 'Area fumatori',
    trouserPress: 'Stiratrice pantaloni',
    trouserPressLocation: 'Davanti all\'ascensore su ogni piano',
    laundry: 'Lavanderia a gettoni',
    laundryNote: '*Detergente, lavatrice/gratis, asciugatrice/a pagamento (¥100 per 30 minuti)',
    wifiTitle: 'Wi-Fi',
    password: 'Password:',
    wifiAccessPoint: 'Si prega di controllare la "Guida Internet della Camera" installata nella vostra camera per il punto di accesso.',
    copy: 'Copia',
    wifiCopyNote: '※È possibile copiare la password toccando il pulsante',
    passwordCopied: 'Password copiata!',
    lostTitle: 'Oggetti smarriti',
    lostText1: 'Di norma, l\'hotel non vi contatterà riguardo agli oggetti smarriti.',
    lostText2: 'Se non c\'è contatto, gli oggetti verranno eliminati dopo 3 mesi secondo la Legge sugli Oggetti Smarriti.',
    lostText3: 'Tuttavia, cibi e bevande verranno eliminati lo stesso giorno.',
    lightingTitle: 'Illuminazione interna',
    lightingDesc: 'Dopo essere entrati nella camera, inserire il portachiavi della camera nella presa elettrica accanto all\'ingresso per accendere l\'illuminazione della camera.',
    lightingNote: '*Inserire la chiave nella presa elettrica.',
    longstayTitle: 'Pulizia (soggiorni consecutivi)',
    cleaningHours: 'Per sostenibilità, la pulizia giornaliera della camera è in genere sospesa durante soggiorni consecutivi. Per igiene, è prevista una pulizia gratuita ogni 7 giorni.',
    cleaningRequest: 'Per il cambio asciugamani: entro le 10:00 applicare sul lato corridoio della porta la targhetta rossa («Change towels and Collect garbage»). Tappetini da bagno in reception.',
    sheetExchange: 'Amenities e camicie da notte sono disponibili sullo scaffale in hall.',
    noCleaning: 'Pulizie aggiuntive (oltre a quella sanitaria) sono a pagamento. Richiederle in reception entro le 10:00. Camera Premium: 2.640 ¥ (IVA incl.)/volta; altre camere: 1.100 ¥ (IVA incl.)/volta.',
    officialHP: 'Sito web ufficiale',
    preparing: 'Le informazioni dettagliate sono in preparazione.',
    dinnerCouponLine1: 'Per la cena di stasera',
    dinnerCouponLine2: 'Ottimi coupon ristorante',
    amenitiesTitle: 'Comune a tutti i tipi di camera',
    amenitiesNote: '※Le attrezzature sono disponibili al 1° piano.',
    amenityTowel: 'Asciugamano',
    amenityBathTowel: 'Asciugamano da bagno',
    amenityDryer: 'Asciugacapelli',
    amenityDeodorant: 'Spray deodorante',
    amenityShampoo: 'Shampoo',
    amenityConditioner: 'Balsamo',
    amenityHandSoap: 'Sapone per le mani',
    amenityToothbrush: 'Set spazzolino',
    amenityBodySoap: 'Sapone per il corpo',
    floor1F: '■ 1F',
    floor2F: '■ 3F',
    freeSpaceNote: '',
    freeSpace: 'Bevanda di benvenuto',
    freeSpaceHours: '1F',
    iwateSachiko: 'Area fumatori (1F)',
    wrappingVending: 'Distributori automatici (1F, 3F)',
    souvenirVending1: 'Forno a microonde (3F, 4F, 6F, 8F, 10F)',
    vendingMachineNote: 'Angolo fumetti (3F, disponibili manga in inglese)',
    laundryHours: 'Il detersivo viene dosato automaticamente.',
  },
  th: {
    hotelName: '',
    hotelTitle: 'โรงแรมซิลค์ทรี นาโกยา',
    heroTitle: 'คู่มือภายในโรงแรม',
    welcomeMessage: 'ขอขอบคุณที่เข้าพักที่ "โรงแรมซิลค์ทรี นาโกยา" ในวันนี้',
    welcomeMessage2: '',
    restaurantCoupon: 'คูปองร้านอาหาร',
    checkInOut: 'เวลาเช็คอิน/เช็คเอาท์',
    bath: 'ล็อบบี้・สิ่งอำนวยความสะดวก',
    breakfast: 'อาหารเช้า',
    dinner: 'อาหารเย็น・คูปองส่วนลด',
    service: 'ชั้นและบริการในโรงแรม',
    wifi: 'Wi-Fi',
    lighting: 'แสงสวางในห้อง',
    longstay: 'ทำความสะอาด (พักหลายคืน)',
    lost: 'ของหายที่พบ',
    quickCheckin: 'เช็คอินด่วน',
    dinnerTab: 'อาหารเย็น・คูปองส่วนลด',
    serviceTab: 'ชั้นและบริการในโรงแรม',
    close: 'ปิด',
    checkIn: 'เช็คอิน',
    checkOut: 'เช็คเอาท์',
    planNote: '※เวลาอาจแตกต่างกันไปตามแผนที่จอง',
    bbhMember: 'สมาชิก BBH',
    earlyCheckin: 'เช็คอินเร็ว',
    earlyCheckinFee: '1,000 เยนต่อชั่วโมง (ถึง 14:00)',
    lobbyDesc1: 'ล็อบบี้ที่หรูหราพร้อมเฟอร์นิเจอร์โบราณยุโรป',
    lobbyDesc2: 'พื้นที่สงบที่ทำให้คุณลืมความวุ่นวายของเมือง',
    lobbyDesc3: 'คุณสามารถเข้า "สตาร์บัคส์ คอฟฟี่" ได้โดยตรงจากล็อบบี้',
    breakfastVenue: 'สถานที่อาหารเช้า',
    breakfastFloor: 'ชั้น 10',
    breakfastTime: 'เวลาทำการ',
    breakfastTimeDetail: '6:45～9:00 (เข้าครั้งสุดท้าย 8:45)',
    breakfastDesc: 'เพลิดเพลินกับบุฟเฟ่ต์อาหารเช้าที่มีคุณค่าทางโภชนาการจากวัตถุดิบท้องถิ่น',
    breakfastNotice: 'เวลาทำการอาจเปลี่ยนแปลงโดยไม่แจ้งให้ทราบล่วงหน้า',
    bathTitle: 'ล็อบบี้・สิ่งอำนวยความสะดวก',
    bathDescription: 'ห้องอาบน้ำขนาดใหญ่แยกชายหญิง 9F',
    operatingHours: 'เวลาทำการ:',
    bathHours: '15:00~10:00 วันถัดไป',
    saunaNote: '(ซาวน่าเท่านั้น 1:00~5:00 หยุดให้บริการ)',
    notice: 'ข้อควรทราบ',
    bathNotice1: '※กรุณานำผ้าเช็ดตัวและอุปกรณ์อาบน้ำจากห้องของท่านเอง',
    bathNotice2: '※ต้องใช้รหัสผ่านในการเข้าห้องอาบน้ำสตรี รหัสผ่านจะมีให้ที่แผนกต้อนรับ',
    freeService: 'บริการฟรี',
    bathServiceDesc: 'เรามีบริการเครื่องดื่มแลคโตบาซิลลัสและไอศกรีมแท่งฟรี',
    breakfastTitle: 'อาหารเช้า (2F ALLY\'s Nagoya)',
    breakfastPrice: 'ผู้ใหญ่ 1,650 เยน (รวมภาษี) / เด็ก (ประถม) 1,100 เยน (รวมภาษี)',
    breakfastPriceLabel: 'ค่าอาหารเช้า',
    breakfastHours: '6:30～9:30 (หยุดรับออเดอร์ 9:00)',
    breakfastPurchaseNote: '※ซื้อตั๋วอาหารเช้าวันนั้นได้ที่ฝ่ายต้อนรับ',
    breakfastPreschoolFree: '※เด็กก่อนวัยเรียนไม่เสียค่าใช้จ่าย',
    breakfastDetail: 'บุฟเฟ่ต์สไตล์ยุโรปและเอเชีย: ขนมปัง แยม แฮม สลัด  donburi โอชาซูเกะ อาหาร名古屋 (kishimen, miso katsu, doteni) ซุปมิโซะ เครื่องดื่ม',
    breakfastMenuNote: '※เมนูบุฟเฟ่ต์เปลี่ยนตามวัน บางเมนูอาจไม่มี',
    breakfastNote1: '※อาจต้องรอคิวในกรณีที่เต็ม',
    breakfastNote2: '※เวลาทำการอาจเปลี่ยนแปลงตามสถานการณ์ความแออัด',
    serviceTitle: 'ชั้นและบริการในโรงแรม',
    vendingMachine: 'ตู้กดสินค้า',
    alcoholNote: '(เครื่องดื่มแอลกอฮอล์อยู่ที่ 5・7・9F)',
    microwave: 'บุฟเฟต์อุปกรณ์อาบน้ำ（14:00～25:00）1F',
    iceMaker: 'เครื่องทำน้ำแข็ง（3F ภายในร้านซักผ้าหยอดเหรียญ）',
    smoking: 'มุมสูบบุหรี่',
    trouserPress: 'เครื่องรีดกางเกง',
    trouserPressLocation: 'หน้าลิฟต์ทุกชั้น',
    laundry: 'ร้านซักผ้าเหรียญ',
    laundryNote: '※เครื่องซักผ้า/ครั้งละ 200 เยน เครื่องอบผ้า/10 นาที 100 เยน (ผงซักฟอกแจกฟรีที่แผนกต้อนรับ)',
    wifiTitle: 'Wi-Fi',
    password: 'รหัสผ่าน:',
    wifiAccessPoint: 'กรุณาตรวจสอบ "คู่มืออินเทอร์เน็ตห้องพัก" ที่ติดตั้งในห้องของคุณสำหรับจุดเชื่อมต่อ',
    copy: 'คัดลอก',
    wifiCopyNote: '※คุณสามารถคัดลอกรหัสผ่านโดยแตะที่ปุ่ม',
    passwordCopied: 'คัดลอกรหัสผ่านแล้ว!',
    lostTitle: 'ของหาย',
    lostText1: 'โดยหลักการแล้ว ทางโรงแรมจะไม่ติดต่อเกี่ยวกับของหาย',
    lostText2: 'หากไม่มีการติดต่อ จะดำเนินการตามกฎหมายของหายหลังจากผ่านไป 3 เดือน',
    lostText3: 'อย่างไรก็ตาม อาหารและเครื่องดื่มจะถูกทิ้งในวันเดียวกัน',
    lightingTitle: 'แสงสวางในห้อง',
    lightingDesc: 'หลังจากเข้าห้อง ให้เสียบพวงกุญแจห้องเข้าในเต้ารับไฟฟ้าข้างทางเข้า แสงสว่างในห้องจะเปิดขึ้น',
    lightingNote: '※เสียบกุญแจเข้าในเต้ารับไฟฟ้า',
    longstayTitle: 'ทำความสะอาด (พักหลายคืน)',
    cleaningHours: 'จากมุมมองความยั่งยืน (SDGs) การทำความสะอาดห้องระหว่างพักหลายคืนจะงดโดยหลักการ เพื่อสุขอนามัยจะมีการทำความสะอาดฟรีทุก 7 วัน',
    cleaningRequest: 'หากต้องการเปลี่ยนผ้าเช็ดตัว: กรุณาแปะป้ายสีแดง（「Change towels and Collect garbage」）ที่ด้านโถงของประตูก่อน 10:00 น. พรมเช็ดเท้ามีที่แผนกต้อนรับ',
    sheetExchange: 'อุปกรณ์อาบน้ำและชุดนอนสามารถใช้ได้ที่ชั้นวางในล็อบบี้',
    noCleaning: 'การทำความสะอาดเพิ่มเติม (นอกเหนือจากการทำความสะอาดตามสุขอนามัย) มีค่าใช้จ่าย กรุณาแจ้งที่แผนกต้อนรับก่อน 10:00 น. ห้องพรีเมียม 2,640 เยน (รวมภาษี)/ครั้ง ห้องอื่น 1,100 เยน (รวมภาษี)/ครั้ง',
    officialHP: 'เว็บไซต์อย่างเป็นทางการ',
    preparing: 'ข้อมูลรายละเอียดกำลังเตรียมการ',
    dinnerCouponLine1: 'สำหรับอาหารเย็นคืนนี้',
    dinnerCouponLine2: 'คูปองร้านอาหารสุดคุ้ม',
    amenitiesTitle: 'ทั่วไปสำหรับทุกประเภทห้อง',
    amenitiesNote: '※สิ่งอำนวยความสะดวกมีให้บริการที่ชั้น 1F',
    amenityTowel: 'ผ้าเช็ดตัว',
    amenityBathTowel: 'ผ้าเช็ดตัวอาบน้ำ',
    amenityDryer: 'ไดร์เป่าผม',
    amenityDeodorant: 'สเปรย์ดับกลิ่น',
    amenityShampoo: 'แชมพู',
    amenityConditioner: 'ครีมนวดผม',
    amenityHandSoap: 'สบู่ล้างมือ',
    amenityToothbrush: 'ชุดแปรงฟัน',
    amenityBodySoap: 'สบู่อาบน้ำ',
    floor1F: '■ 1F',
    floor2F: '■ 3F',
    freeSpaceNote: '',
    freeSpace: 'เครื่องดื่มต้อนรับ',
    freeSpaceHours: '1F',
    iwateSachiko: 'มุมสูบบุหรี่ 1F',
    wrappingVending: 'ตู้กดสินค้า 1F・3F',
    souvenirVending1: 'ไมโครเวฟ 3F・4F・6F・8F・10F',
    vendingMachineNote: 'มุมการ์ตูน 3F（มีการ์ตูนภาษาอังกฤษ）',
    laundryHours: 'น้ำยาซักผ้าจ่ายอัตโนมัติ',
  },
  vi: {
    hotelName: '',
    hotelTitle: 'Hotel Silk Tree Nagoya',
    heroTitle: 'Hướng dẫn trong khách sạn',
    welcomeMessage: 'Cảm ơn quý khách đã lưu trú tại "Hotel Silk Tree Nagoya" hôm nay.',
    welcomeMessage2: '',
    restaurantCoupon: 'Phiếu giảm giá nhà hàng',
    checkInOut: 'Giờ nhận/trả phòng',
    bath: 'Sảnh・Cơ sở vật chất',
    breakfast: 'Bữa sáng',
    dinner: 'Bữa tối・Phiếu giảm giá',
    service: 'Hướng dẫn theo tầng',
    wifi: 'Wi-Fi',
    lighting: 'Đèn trong phòng',
    longstay: 'Dọn phòng (lưu trú liên tiếp)',
    lost: 'Đồ thất lạc',
    quickCheckin: 'Nhận phòng nhanh',
    dinnerTab: 'Bữa tối・Phiếu giảm giá',
    serviceTab: 'Hướng dẫn theo tầng',
    close: 'Đóng',
    checkIn: 'Nhận phòng',
    checkOut: 'Trả phòng',
    planNote: '※Thời gian có thể khác nhau tùy theo gói.',
    bbhMember: 'Thành viên BBH',
    earlyCheckin: 'Nhận phòng sớm',
    earlyCheckinFee: '1.000 yên mỗi giờ (đến 14:00)',
    lobbyDesc1: 'Sảnh sang trọng với đồ nội thất cổ châu Âu.',
    lobbyDesc2: 'Một không gian yên tĩnh để bạn quên đi sự ồn ào của thành phố.',
    lobbyDesc3: 'Bạn có thể vào "Starbucks Coffee" trực tiếp từ sảnh.',
    breakfastVenue: 'Địa điểm bữa sáng',
    breakfastFloor: 'Tầng 10',
    breakfastTime: 'Giờ hoạt động',
    breakfastTimeDetail: '6:45～9:00 (vào cuối cùng 8:45)',
    breakfastDesc: 'Thưởng thức bữa sáng buffet bổ dưỡng với nguyên liệu địa phương.',
    breakfastNotice: 'Giờ hoạt động có thể thay đổi mà không cần thông báo trước.',
    bathTitle: 'Sảnh・Cơ sở vật chất',
    bathDescription: 'Bồn tắm lớn nam nữ riêng biệt 9F',
    operatingHours: 'Giờ mở cửa:',
    bathHours: '15:00~10:00 ngày hôm sau',
    saunaNote: '(Chỉ phòng xông hơi 1:00~5:00 đóng cửa)',
    notice: 'Lưu ý',
    bathNotice1: '※Vui lòng tự mang khăn và đồ dùng cá nhân từ phòng.',
    bathNotice2: '※Cần mật khẩu để vào bồn tắm nữ. Mật khẩu sẽ được cung cấp tại lễ tân.',
    freeService: 'Dịch vụ miễn phí',
    bathServiceDesc: 'Chúng tôi cung cấp miễn phí đồ uống lactic acid và kẹo que đá.',
    breakfastTitle: 'Bữa sáng (2F ALLY\'s Nagoya)',
    breakfastPrice: 'Người lớn 1.650 yên (đã gồm thuế) / Trẻ em (tiểu học) 1.100 yên (đã gồm thuế)',
    breakfastPriceLabel: 'Giá bữa sáng',
    breakfastHours: '6:30～9:30 (Dừng gọi món 9:00)',
    breakfastPurchaseNote: '※Vé bữa sáng bán tại quầy lễ tân trong ngày.',
    breakfastPreschoolFree: '※Trẻ mầm non miễn phí.',
    breakfastDetail: 'Buffet phong cách châu Âu & châu Á: bánh mì, mứt, giăm bông, salad, donburi, ochazuke, đặc sản Nagoya (kishimen, miso katsu, doteni), súp miso, đồ uống.',
    breakfastMenuNote: '※Thực đơn buffet thay đổi theo ngày; không phải món nào cũng có.',
    breakfastNote1: '※Có thể phải chờ nếu đầy chỗ.',
    breakfastNote2: '※Giờ mở cửa có thể thay đổi tùy theo tình hình đông khách.',
    serviceTitle: 'Hướng dẫn theo tầng',
    vendingMachine: 'Máy bán hàng tự động',
    alcoholNote: '(Đồ uống có cồn ở 5・7・9F)',
    microwave: 'Khu tự chọn đồ dùng (14:00–25:00) 1F',
    iceMaker: 'Máy làm đá (3F, trong tiệm giặt xu)',
    smoking: 'Khu vực hút thuốc',
    trouserPress: 'Máy ủi quần',
    trouserPressLocation: 'Trước thang máy mỗi tầng',
    laundry: 'Tiệm giặt tự động',
    laundryNote: '※Máy giặt/1 lần 200 yên Máy sấy/10 phút 100 yên (Bột giặt phát miễn phí tại lễ tân)',
    wifiTitle: 'Wi-Fi',
    password: 'Mật khẩu:',
    wifiAccessPoint: 'Vui lòng kiểm tra "Hướng dẫn Internet phòng khách" được lắp đặt trong phòng của bạn để biết điểm truy cập.',
    copy: 'Sao chép',
    wifiCopyNote: '※Bạn có thể sao chép mật khẩu bằng cách nhấn vào nút',
    passwordCopied: 'Đã sao chép mật khẩu!',
    lostTitle: 'Đồ thất lạc',
    lostText1: 'Về nguyên tắc, khách sạn sẽ không liên lạc về đồ thất lạc.',
    lostText2: 'Nếu không có liên lạc, sẽ được xử lý sau 3 tháng theo luật đồ thất lạc.',
    lostText3: 'Tuy nhiên, thực phẩm và đồ uống sẽ được xử lý trong ngày.',
    lightingTitle: 'Đèn trong phòng',
    lightingDesc: 'Sau khi vào phòng, cắm móc khóa phòng vào ổ cắm điện bên cạnh lối vào để bật đèn trong phòng.',
    lightingNote: '※Cắm chìa khóa vào ổ cắm điện.',
    longstayTitle: 'Dọn phòng (lưu trú liên tiếp)',
    cleaningHours: 'Theo hướng phát triển bền vững (SDGs), dọn phòng hàng ngày thường được tạm ngừng khi lưu trú liên tiếp. Vì lý do vệ sinh, miễn phí dọn phòng mỗi 7 ngày.',
    cleaningRequest: 'Để đổi khăn: trước 10:00 vui lòng gắn thẻ đỏ («Change towels and Collect garbage») ở phía hành lang của cửa. Thảm chân tắm có tại quầy lễ tân.',
    sheetExchange: 'Đồ dùng và đồ ngủ có tại kệ ở sảnh.',
    noCleaning: 'Dọn phòng bổ sung (ngoài dọn vệ sinh) tính phí. Vui lòng yêu cầu tại quầy lễ tân trước 10:00. Phòng Premium 2.640 yên (đã gồm thuế)/lần; các phòng khác 1.100 yên (đã gồm thuế)/lần.',
    officialHP: 'Trang web chính thức',
    preparing: 'Thông tin chi tiết đang được chuẩn bị.',
    dinnerCouponLine1: 'Cho bữa tối tối nay',
    dinnerCouponLine2: 'Phiếu giảm giá nhà hàng tuyệt vời',
    amenitiesTitle: 'Chung cho tất cả các loại phòng',
    amenitiesNote: '※Đồ dùng tiện nghi có sẵn ở tầng 1F',
    amenityTowel: 'Khăn tắm',
    amenityBathTowel: 'Khăn tắm lớn',
    amenityDryer: 'Máy sấy tóc',
    amenityDeodorant: 'Xịt khử mùi',
    amenityShampoo: 'Dầu gội',
    amenityConditioner: 'Dầu xả',
    amenityHandSoap: 'Xà phòng rửa tay',
    amenityToothbrush: 'Bộ đánh răng',
    amenityBodySoap: 'Xà phòng tắm',
    floor1F: '■ 1F',
    floor2F: '■ 3F',
    freeSpaceNote: '',
    freeSpace: 'Đồ uống chào mừng',
    freeSpaceHours: '1F',
    iwateSachiko: 'Khu hút thuốc (1F)',
    wrappingVending: 'Máy bán hàng tự động (1F, 3F)',
    souvenirVending1: 'Lò vi sóng (3F, 4F, 6F, 8F, 10F)',
    vendingMachineNote: 'Góc truyện tranh (3F, có truyện tiếng Anh)',
    laundryHours: 'Nước giặt được tự động cấp.',
  },
  id: {
    hotelName: '',
    hotelTitle: 'Hotel Silk Tree Nagoya',
    heroTitle: 'Panduan dalam hotel',
    welcomeMessage: 'Terima kasih telah menginap di "Hotel Silk Tree Nagoya" hari ini.',
    welcomeMessage2: '',
    restaurantCoupon: 'Kupon restoran',
    checkInOut: 'Waktu check-in/check-out',
    bath: 'Lobi・Fasilitas',
    breakfast: 'Sarapan',
    dinner: 'Makan malam・Kupon diskon',
    service: 'Panduan lantai',
    wifi: 'Wi-Fi',
    lighting: 'Lampu kamar',
    longstay: 'Kebersihan (menginap berturut-turut)',
    lost: 'Barang hilang',
    quickCheckin: 'Check-in cepat',
    dinnerTab: 'Makan malam・Kupon diskon',
    serviceTab: 'Panduan lantai',
    close: 'Tutup',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    planNote: '※Waktu mungkin berbeda tergantung pada paket.',
    bbhMember: 'Anggota BBH',
    earlyCheckin: 'Check-in awal',
    earlyCheckinFee: '1.000 yen per jam (sampai pukul 14:00)',
    lobbyDesc1: 'Lobi elegan dengan perabotan antik Eropa.',
    lobbyDesc2: 'Ruang tenang di mana Anda dapat melupakan hiruk pikuk kota.',
    lobbyDesc3: 'Anda dapat masuk ke "Starbucks Coffee" langsung dari lobi.',
    breakfastVenue: 'Tempat sarapan',
    breakfastFloor: 'Lantai 10',
    breakfastTime: 'Jam operasional',
    breakfastTimeDetail: '6:45～9:00 (masuk terakhir 8:45)',
    breakfastDesc: 'Nikmati buffet sarapan bergizi dengan bahan-bahan lokal.',
    breakfastNotice: 'Jam operasional dapat berubah tanpa pemberitahuan.',
    bathTitle: 'Lobi・Fasilitas',
    bathDescription: 'Pemandian umum terpisah pria dan wanita 9F',
    operatingHours: 'Jam operasional:',
    bathHours: '15:00~10:00 hari berikutnya',
    saunaNote: '(Hanya sauna 1:00~5:00 tutup)',
    notice: 'Pemberitahuan',
    bathNotice1: '※Silakan bawa handuk dan perlengkapan mandi Anda sendiri dari kamar.',
    bathNotice2: '※Kode sandi diperlukan untuk masuk ke pemandian wanita. Kode sandi akan diberikan di resepsionis.',
    freeService: 'Layanan gratis',
    bathServiceDesc: 'Kami menyediakan minuman asam laktat dan permen es gratis.',
    breakfastTitle: 'Sarapan (2F ALLY\'s Nagoya)',
    breakfastPrice: 'Dewasa 1.650 yen (termasuk pajak) / Anak (SD) 1.100 yen (termasuk pajak)',
    breakfastPriceLabel: 'Biaya sarapan',
    breakfastHours: '6:30～9:30 (Stop pesanan 9:00)',
    breakfastPurchaseNote: '※Tiket sarapan dijual di resepsionis pada hari yang sama.',
    breakfastPreschoolFree: '※Anak prasekolah gratis.',
    breakfastDetail: 'Buffet gaya Eropa & Asia: roti, selai, ham, salad, donburi, ochazuke, spesialisasi Nagoya (kishimen, miso katsu, doteni), sup miso, minuman.',
    breakfastMenuNote: '※Menu buffet berganti per hari; tidak semua hidangan selalu tersedia.',
    breakfastNote1: '※Anda mungkin diminta menunggu jika penuh.',
    breakfastNote2: '※Jam operasional dapat berubah tergantung pada kepadatan.',
    serviceTitle: 'Panduan lantai',
    vendingMachine: 'Mesin penjual otomatis',
    alcoholNote: '(Minuman beralkohol di 5・7・9F)',
    microwave: 'Bufet amenitas (14:00–25:00) 1F',
    iceMaker: 'Mesin es (3F, di binatu koin)',
    smoking: 'Area merokok',
    trouserPress: 'Setrika celana',
    trouserPressLocation: 'Di depan lift setiap lantai',
    laundry: 'Binatu koin',
    laundryNote: '※Mesin cuci/1 kali 200 yen Pengering/10 menit 100 yen (Deterjen gratis di resepsionis)',
    wifiTitle: 'Wi-Fi',
    password: 'Kata sandi:',
    wifiAccessPoint: 'Silakan periksa "Panduan Internet Kamar Tamu" yang terpasang di kamar Anda untuk titik akses.',
    copy: 'Salin',
    wifiCopyNote: '※Anda dapat menyalin kata sandi dengan mengetuk tombol',
    passwordCopied: 'Kata sandi disalin!',
    lostTitle: 'Barang hilang',
    lostText1: 'Sebagai aturan, hotel tidak akan menghubungi mengenai barang hilang.',
    lostText2: 'Jika tidak ada kontak, akan dibuang setelah 3 bulan sesuai dengan Undang-Undang Barang Hilang.',
    lostText3: 'Namun, makanan dan minuman akan dibuang pada hari yang sama.',
    lightingTitle: 'Lampu kamar',
    lightingDesc: 'Setelah memasuki kamar, masukkan gantungan kunci kamar ke soket listrik di samping pintu masuk untuk menyalakan lampu kamar.',
    lightingNote: '※Masukkan kunci ke soket listrik.',
    longstayTitle: 'Kebersihan (menginap berturut-turut)',
    cleaningHours: 'Dari perspektif keberlanjutan (SDGs), pembersihan kamar saat menginap berturut-turut pada umumnya dihentikan. Untuk higiene, pembersihan gratis dilakukan setiap 7 hari.',
    cleaningRequest: 'Untuk penggantian handuk: sebelum pukul 10:00 tempel kartu merah («Change towels and Collect garbage») di sisi koridor pintu. Keset kaki tersedia di resepsionis.',
    sheetExchange: 'Amenitas dan pakaian tidur tersedia di rak di lobi.',
    noCleaning: 'Pembersihan tambahan (selain sanitasi) berbayar. Silakan minta di resepsionis sebelum pukul 10:00. Kamar premium ¥2.640 (termasuk pajak)/kali; kamar lainnya ¥1.100 (termasuk pajak)/kali.',
    officialHP: 'Situs web resmi',
    preparing: 'Informasi detail sedang disiapkan.',
    dinnerCouponLine1: 'Untuk makan malam malam ini',
    dinnerCouponLine2: 'Kupon restoran hebat',
    amenitiesTitle: 'Umum untuk semua tipe kamar',
    amenitiesNote: '※Perlengkapan tersedia di lantai 1F',
    amenityTowel: 'Handuk',
    amenityBathTowel: 'Handuk mandi',
    amenityDryer: 'Pengering rambut',
    amenityDeodorant: 'Semprotan penghilang bau',
    amenityShampoo: 'Sampo',
    amenityConditioner: 'Kondisioner',
    amenityHandSoap: 'Sabun cuci tangan',
    amenityToothbrush: 'Set sikat gigi',
    amenityBodySoap: 'Sabun badan',
    floor1F: '■ 1F',
    floor2F: '■ 3F',
    freeSpaceNote: '',
    freeSpace: 'Minuman selamat datang',
    freeSpaceHours: '1F',
    iwateSachiko: 'Area merokok (1F)',
    wrappingVending: 'Mesin penjual otomatis (1F, 3F)',
    souvenirVending1: 'Microwave (3F, 4F, 6F, 8F, 10F)',
    vendingMachineNote: 'Pojok komik (3F, tersedia komik berbahasa Inggris)',
    laundryHours: 'Deterjen diberikan otomatis.',
  },
  tl: {
    hotelName: '',
    hotelTitle: 'Hotel Silk Tree Nagoya',
    heroTitle: 'Gabay sa hotel',
    welcomeMessage: 'Maraming salamat sa pag-stay sa "Hotel Silk Tree Nagoya" ngayong araw.',
    welcomeMessage2: '',
    restaurantCoupon: 'Coupon ng restaurant',
    checkInOut: 'Oras ng check-in/check-out',
    bath: 'Lobby・Pasilidad',
    breakfast: 'Almusal',
    dinner: 'Hapunan・Coupon discount',
    service: 'Gabay sa palapag',
    wifi: 'Wi-Fi',
    lighting: 'Ilaw sa kwarto',
    longstay: 'Paglilinis (magkakasunod na gabi)',
    lost: 'Nawawalang gamit',
    quickCheckin: 'Mabilis na check-in',
    dinnerTab: 'Hapunan・Coupon discount',
    serviceTab: 'Gabay sa palapag',
    close: 'Isara',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    planNote: '※Ang oras ay maaaring mag-iba depende sa plan.',
    bbhMember: 'Miyembro ng BBH',
    earlyCheckin: 'Maagang check-in',
    earlyCheckinFee: '1,000 yen bawat oras (hanggang 14:00)',
    lobbyDesc1: 'Eleganteng lobby na may European antique furniture.',
    lobbyDesc2: 'Tahimik na espasyo kung saan makakalimutan mo ang ingay ng lungsod.',
    lobbyDesc3: 'Maaari kang pumasok sa "Starbucks Coffee" direkta mula sa lobby.',
    breakfastVenue: 'Lugar ng almusal',
    breakfastFloor: 'Ika-10 palapag',
    breakfastTime: 'Oras ng operasyon',
    breakfastTimeDetail: '6:45～9:00 (huling pasok 8:45)',
    breakfastDesc: 'Tangkilikin ang masustansyang almusal buffet na may lokal na sangkap.',
    breakfastNotice: 'Ang oras ng operasyon ay maaaring magbago nang walang paunawa.',
    bathTitle: 'Lobby・Pasilidad',
    bathDescription: 'Hiwalay na malaking banyo para sa lalaki at babae 9F',
    operatingHours: 'Oras ng operasyon:',
    bathHours: '15:00~10:00 kinabukasan',
    saunaNote: '(Sauna lamang 1:00~5:00 sarado)',
    notice: 'Paalala',
    bathNotice1: '※Mangyaring magdala ng sariling tuwalya at amenities mula sa kwarto.',
    bathNotice2: '※Kailangan ng password para makapasok sa banyo ng babae. Ang password ay ibibigay sa front desk.',
    freeService: 'Libreng serbisyo',
    bathServiceDesc: 'Nagbibigay kami ng libreng lactic acid drinks at ice candy.',
    breakfastTitle: 'Almusal (2F ALLY\'s Nagoya)',
    breakfastPrice: 'Matanda 1,650 yen (kasama ang tax) / Bata (elementary) 1,100 yen (kasama ang tax)',
    breakfastPriceLabel: 'Presyo ng almusal',
    breakfastHours: '6:30～9:30 (Stop order 9:00)',
    breakfastPurchaseNote: '※Available ang almusal ticket sa front desk sa araw na iyon.',
    breakfastPreschoolFree: '※Libre ang preschool children.',
    breakfastDetail: 'European & Oriental buffet: tinapay, jam, ham, salad, donburi, ochazuke, Nagoya specialties (kishimen, miso katsu, doteni), miso soup, drinks.',
    breakfastMenuNote: '※Nag-iiba ang buffet araw-araw; hindi lahat ng putahe ay laging available.',
    breakfastNote1: '※Maaaring kailangan maghintay kung puno.',
    breakfastNote2: '※Ang oras ng operasyon ay maaaring magbago depende sa siksikan.',
    serviceTitle: 'Gabay sa palapag',
    vendingMachine: 'Vending machines',
    alcoholNote: '(Alcoholic drinks sa 5・7・9F)',
    microwave: 'Amenity buffet (14:00–25:00) 1F',
    iceMaker: 'Ice maker (3F, sa loob ng coin laundry)',
    smoking: 'Smoking area',
    trouserPress: 'Trouser press',
    trouserPressLocation: 'Sa harap ng elevator sa bawat palapag',
    laundry: 'Coin laundry',
    laundryNote: '※Washing machine/1 beses 200 yen Dryer/10 minuto 100 yen (Detergent libreng kuha sa front desk)',
    wifiTitle: 'Wi-Fi',
    password: 'Password:',
    wifiAccessPoint: 'Mangyaring suriin ang "Guest Room Internet Guide" na naka-install sa inyong kwarto para sa access point.',
    copy: 'Kopyahin',
    wifiCopyNote: '※Maaari mong kopyahin ang password sa pamamagitan ng pag-tap sa button',
    passwordCopied: 'Nakopya na ang password!',
    lostTitle: 'Nawawalang gamit',
    lostText1: 'Bilang patakaran, ang hotel ay hindi makikipag-ugnayan tungkol sa nawawalang gamit.',
    lostText2: 'Kung walang contact, itatapon pagkatapos ng 3 buwan ayon sa Lost Property Act.',
    lostText3: 'Gayunpaman, ang pagkain at inumin ay itatapon sa parehong araw.',
    lightingTitle: 'Ilaw sa kwarto',
    lightingDesc: 'Pagkatapos pumasok sa kwarto, ilagay ang key holder ng kwarto sa power socket sa tabi ng entrance para mag-on ang ilaw sa kwarto.',
    lightingNote: '※Ilagay ang susi sa power socket.',
    longstayTitle: 'Paglilinis (magkakasunod na gabi)',
    cleaningHours: 'Mula sa pananaw ng SDGs, karaniwang sinususpende ang araw-araw na paglilinis ng kwarto kapag magkakasunod na gabi. Para sa kalusugan, libre ang paglilinis tuwing 7 araw.',
    cleaningRequest: 'Para sa palitan ng tuwalya: bago mag-10:00, ilagay ang pulang card («Change towels and Collect garbage») sa gilid ng pinto papuntang hallway. May bath mat sa front desk.',
    sheetExchange: 'Available ang amenities at nightwear sa shelf sa lobby.',
    noCleaning: 'Karagdagang paglilinis (maliban sa sanitary) ay may bayad. Mag-request sa front desk bago mag-10:00. Premium room ¥2,640 (kasama ang tax)/beses; iba pang kwarto ¥1,100 (kasama ang tax)/beses.',
    officialHP: 'Official website',
    preparing: 'Ang detalyadong impormasyon ay inihahanda.',
    dinnerCouponLine1: 'Para sa hapunan ngayong gabi',
    dinnerCouponLine2: 'Mahusay na restaurant coupons',
    amenitiesTitle: 'Karaniwan sa lahat ng uri ng kwarto',
    amenitiesNote: '※Ang mga kagamitan ay available sa 1F floor.',
    amenityTowel: 'Tuwalya',
    amenityBathTowel: 'Tuwalya sa paliguan',
    amenityDryer: 'Hair dryer',
    amenityDeodorant: 'Deodorant spray',
    amenityShampoo: 'Shampoo',
    amenityConditioner: 'Conditioner',
    amenityHandSoap: 'Hand soap',
    amenityToothbrush: 'Toothbrush set',
    amenityBodySoap: 'Body soap',
    floor1F: '■ 1F',
    floor2F: '■ 3F',
    freeSpaceNote: '',
    freeSpace: 'Welcome drink',
    freeSpaceHours: '1F',
    iwateSachiko: 'Smoking area (1F)',
    wrappingVending: 'Vending machines (1F, 3F)',
    souvenirVending1: 'Microwave (3F, 4F, 6F, 8F, 10F)',
    vendingMachineNote: 'Comic corner (3F, may English comics)',
    laundryHours: 'Awtomatikong nagde-dose ng detergent.',
  },
  ms: {
    hotelName: '',
    hotelTitle: 'Hotel Silk Tree Nagoya',
    heroTitle: 'Panduan hotel',
    welcomeMessage: 'Terima kasih kerana menginap di "Hotel Silk Tree Nagoya" hari ini.',
    welcomeMessage2: '',
    restaurantCoupon: 'Kupon restoran',
    checkInOut: 'Masa daftar masuk/keluar',
    bath: 'Lobi・Kemudahan',
    breakfast: 'Sarapan',
    dinner: 'Makan malam・Kupon diskaun',
    service: 'Panduan tingkat',
    wifi: 'Wi-Fi',
    lighting: 'Lampu bilik',
    longstay: 'Pembersihan (menginap berturut-turut)',
    lost: 'Barang hilang',
    quickCheckin: 'Daftar masuk pantas',
    dinnerTab: 'Makan malam・Kupon diskaun',
    serviceTab: 'Panduan tingkat',
    close: 'Tutup',
    checkIn: 'Daftar masuk',
    checkOut: 'Daftar keluar',
    planNote: '※Masa mungkin berbeza bergantung pada pelan.',
    bbhMember: 'Ahli BBH',
    earlyCheckin: 'Daftar masuk awal',
    earlyCheckinFee: '1,000 yen sejam (sehingga 14:00)',
    lobbyDesc1: 'Lobi yang elegan dengan perabot antik Eropah.',
    lobbyDesc2: 'Ruang yang tenang di mana anda boleh melupakan kesibukan bandar.',
    lobbyDesc3: 'Anda boleh masuk ke "Starbucks Coffee" terus dari lobi.',
    breakfastVenue: 'Tempat sarapan',
    breakfastFloor: 'Tingkat 10',
    breakfastTime: 'Waktu operasi',
    breakfastTimeDetail: '6:45～9:00 (kemasukan terakhir 8:45)',
    breakfastDesc: 'Nikmati bufet sarapan yang berkhasiat dengan bahan-bahan tempatan.',
    breakfastNotice: 'Waktu operasi tertakluk kepada perubahan tanpa notis.',
    bathTitle: 'Lobi・Kemudahan',
    bathDescription: 'Bilik mandi awam berasingan lelaki dan wanita 9F',
    operatingHours: 'Waktu operasi:',
    bathHours: '15:00~10:00 hari berikutnya',
    saunaNote: '(Hanya sauna 1:00~5:00 tutup)',
    notice: 'Notis',
    bathNotice1: '※Sila bawa tuala dan kemudahan sendiri dari bilik.',
    bathNotice2: '※Kata laluan diperlukan untuk masuk ke bilik mandi wanita. Kata laluan akan diberikan di kaunter depan.',
    freeService: 'Perkhidmatan percuma',
    bathServiceDesc: 'Kami menyediakan minuman asid laktik dan gula-gula ais percuma.',
    breakfastTitle: 'Sarapan (2F ALLY\'s Nagoya)',
    breakfastPrice: 'Dewasa 1,650 yen (termasuk cukai) / Kanak-kanak (rendah) 1,100 yen (termasuk cukai)',
    breakfastPriceLabel: 'Harga sarapan',
    breakfastHours: '6:30～9:30 (Berhenti pesanan 9:00)',
    breakfastPurchaseNote: '※Tiket sarapan dijual di kaunter resepsi pada hari yang sama.',
    breakfastPreschoolFree: '※Kanak-kanak prasekolah percuma.',
    breakfastDetail: 'Buffet gaya Eropah & Asia: roti, jem, ham, salad, donburi, ochazuke, hidangan Nagoya (kishimen, miso katsu, doteni), sup miso, minuman.',
    breakfastMenuNote: '※Menu buffet berubah mengikut hari; tidak semua hidangan sentiasa tersedia.',
    breakfastNote1: '※Mungkin perlu menunggu jika penuh.',
    breakfastNote2: '※Waktu operasi mungkin berubah bergantung pada kesesakan.',
    serviceTitle: 'Panduan tingkat',
    vendingMachine: 'Mesin layan diri',
    alcoholNote: '(Minuman beralkohol di 5・7・9F)',
    microwave: 'Bufet ameniti (14:00–25:00) 1F',
    iceMaker: 'Pembuat ais (3F, dalam dobi syiling)',
    smoking: 'Kawasan merokok',
    trouserPress: 'Seterika seluar',
    trouserPressLocation: 'Di hadapan lif setiap tingkat',
    laundry: 'Dobi syiling',
    laundryNote: '※Mesin basuh/1 kali 200 yen Pengering/10 minit 100 yen (Detergen percuma di kaunter depan)',
    wifiTitle: 'Wi-Fi',
    password: 'Kata laluan:',
    wifiAccessPoint: 'Sila semak "Panduan Internet Bilik Tetamu" yang dipasang di bilik anda untuk titik akses.',
    copy: 'Salin',
    wifiCopyNote: '※Anda boleh menyalin kata laluan dengan menekan butang',
    passwordCopied: 'Kata laluan disalin!',
    lostTitle: 'Barang hilang',
    lostText1: 'Sebagai peraturan, hotel tidak akan menghubungi mengenai barang hilang.',
    lostText2: 'Jika tiada hubungan, akan dilupuskan selepas 3 bulan mengikut Akta Harta Hilang.',
    lostText3: 'Walau bagaimanapun, makanan dan minuman akan dilupuskan pada hari yang sama.',
    lightingTitle: 'Lampu bilik',
    lightingDesc: 'Selepas memasuki bilik, masukkan pemegang kunci bilik ke dalam soket kuasa di sebelah pintu masuk untuk menghidupkan lampu bilik.',
    lightingNote: '※Masukkan kunci ke dalam soket kuasa.',
    longstayTitle: 'Pembersihan (menginap berturut-turut)',
    cleaningHours: 'Dari perspektif SDGs, pembersihan bilik semasa menginap berturut-turut pada amnya digantung. Untuk kebersihan, pembersihan percuma diberikan setiap 7 hari.',
    cleaningRequest: 'Untuk pertukaran tuala: sebelum jam 10:00, sila letakkan kad merah («Change towels and Collect garbage») di bahagian koridor pintu. Tikar mandi tersedia di kaunter depan.',
    sheetExchange: 'Ameniti dan pakaian tidur tersedia di rak di lobi.',
    noCleaning: 'Pembersihan tambahan (selain sanitari) adalah berbayar. Sila mohon di kaunter depan sebelum jam 10:00. Bilik premium ¥2,640 (termasuk cukai)/sesi; bilik lain ¥1,100 (termasuk cukai)/sesi.',
    officialHP: 'Laman web rasmi',
    preparing: 'Maklumat terperinci sedang disediakan.',
    dinnerCouponLine1: 'Untuk makan malam malam ini',
    dinnerCouponLine2: 'Kupon restoran hebat',
    amenitiesTitle: 'Biasa untuk semua jenis bilik',
    amenitiesNote: '※Kemudahan tersedia di tingkat 1F',
    amenityTowel: 'Tuala',
    amenityBathTowel: 'Tuala mandi',
    amenityDryer: 'Pengering rambut',
    amenityDeodorant: 'Semburan penghilang bau',
    amenityShampoo: 'Syampu',
    amenityConditioner: 'Perapi',
    amenityHandSoap: 'Sabun tangan',
    amenityToothbrush: 'Set berus gigi',
    amenityBodySoap: 'Sabun badan',
    floor1F: '■ 1F',
    floor2F: '■ 3F',
    freeSpaceNote: '',
    freeSpace: 'Minuman alu-aluan',
    freeSpaceHours: '1F',
    iwateSachiko: 'Kawasan merokok (1F)',
    wrappingVending: 'Mesin layan diri (1F, 3F)',
    souvenirVending1: 'Ketuhar gelombang mikro (3F, 4F, 6F, 8F, 10F)',
    vendingMachineNote: 'Sudut komik (3F, komik bahasa Inggeris tersedia)',
    laundryHours: 'Detergen diberi secara automatik.',
  },
  pt: {
    hotelName: '',
    hotelTitle: 'Hotel Silk Tree Nagoya',
    heroTitle: 'Guia do hotel',
    welcomeMessage: 'Muito obrigado por se hospedar no "Hotel Silk Tree Nagoya" hoje.',
    welcomeMessage2: '',
    restaurantCoupon: 'Cupom de restaurante',
    checkInOut: 'Horário de check-in/check-out',
    bath: 'Lobby・Instalações',
    breakfast: 'Café da manhã',
    dinner: 'Jantar・Cupom de desconto',
    service: 'Andares & instalações',
    wifi: 'Wi-Fi',
    lighting: 'Iluminação do quarto',
    longstay: 'Limpeza (estadias consecutivas)',
    lost: 'Objetos perdidos',
    quickCheckin: 'Check-in rápido',
    dinnerTab: 'Jantar・Cupom de desconto',
    serviceTab: 'Andares & instalações',
    close: 'Fechar',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    planNote: '※O horário pode variar dependendo do plano.',
    bbhMember: 'Membro BBH',
    earlyCheckin: 'Check-in antecipado',
    earlyCheckinFee: '1.000 ienes por hora (até às 14:00)',
    lobbyDesc1: 'Um lobby elegante com móveis antigos europeus.',
    lobbyDesc2: 'Um espaço calmo onde você pode esquecer a agitação da cidade.',
    lobbyDesc3: 'Você pode entrar no "Starbucks Coffee" diretamente do lobby.',
    breakfastVenue: 'Local do café da manhã',
    breakfastFloor: '10º andar',
    breakfastTime: 'Horário de funcionamento',
    breakfastTimeDetail: '6:45～9:00 (última entrada 8:45)',
    breakfastDesc: 'Desfrute de um buffet de café da manhã nutritivo com ingredientes locais.',
    breakfastNotice: 'O horário de funcionamento está sujeito a alterações sem aviso prévio.',
    bathTitle: 'Lobby・Instalações',
    bathDescription: 'Banho público separado para homens e mulheres 9F',
    operatingHours: 'Horário de funcionamento:',
    bathHours: '15:00~10:00 do dia seguinte',
    saunaNote: '(Apenas sauna 1:00~5:00 fechada)',
    notice: 'Aviso',
    bathNotice1: '※Por favor, traga suas próprias toalhas e amenidades do quarto.',
    bathNotice2: '※É necessária uma senha para entrar no banho público feminino. A senha será fornecida na recepção.',
    freeService: 'Serviço gratuito',
    bathServiceDesc: 'Oferecemos gratuitamente bebidas de ácido lático e picolés.',
    breakfastTitle: 'Café da manhã (2F ALLY\'s Nagoya)',
    breakfastPrice: 'Adulto 1.650 ienes (com impostos) / Criança (ensino fundamental) 1.100 ienes (com impostos)',
    breakfastPriceLabel: 'Preço do café da manhã',
    breakfastHours: '6:30～9:30 (Parar pedidos 9:00)',
    breakfastPurchaseNote: '※Ingressos para café da manhã à venda na recepção no mesmo dia.',
    breakfastPreschoolFree: '※Crianças em idade pré-escolar grátis.',
    breakfastDetail: 'Buffet estilo europeu e oriental: pão, compota, presunto, salada, donburi, ochazuke, especialidades de Nagoya (kishimen, miso katsu, doteni), sopa miso, bebidas.',
    breakfastMenuNote: '※O buffet varia conforme o dia; nem todos os pratos estão sempre disponíveis.',
    breakfastNote1: '※Pode ser necessário esperar se estiver lotado.',
    breakfastNote2: '※O horário de funcionamento pode mudar dependendo da lotação.',
    serviceTitle: 'Andares & instalações',
    vendingMachine: 'Máquinas de venda automática',
    alcoholNote: '(Bebidas alcoólicas em 5・7・9F)',
    microwave: 'Buffet de amenities (14:00–25:00) 1F',
    iceMaker: 'Máquina de gelo (3F, dentro da lavandaria automática)',
    smoking: 'Área de fumantes',
    trouserPress: 'Prensa de calças',
    trouserPressLocation: 'Em frente ao elevador em cada andar',
    laundry: 'Lavanderia de moedas',
    laundryNote: '※Máquina de lavar/1 vez 200 ienes Secadora/10 minutos 100 ienes (Detergente grátis na recepção)',
    wifiTitle: 'Wi-Fi',
    password: 'Senha:',
    wifiAccessPoint: 'Por favor, verifique o "Guia de Internet do Quarto" instalado no seu quarto para o ponto de acesso.',
    copy: 'Copiar',
    wifiCopyNote: '※Você pode copiar a senha tocando no botão',
    passwordCopied: 'Senha copiada!',
    lostTitle: 'Objetos perdidos',
    lostText1: 'Como regra, o hotel não entrará em contato sobre objetos perdidos.',
    lostText2: 'Se não houver contato, será descartado após 3 meses de acordo com a Lei de Objetos Perdidos.',
    lostText3: 'No entanto, alimentos e bebidas serão descartados no mesmo dia.',
    lightingTitle: 'Iluminação do quarto',
    lightingDesc: 'Após entrar no quarto, insira o porta-chaves do quarto na tomada elétrica ao lado da entrada para acender a iluminação do quarto.',
    lightingNote: '※Insira a chave na tomada elétrica.',
    longstayTitle: 'Limpeza (estadias consecutivas)',
    cleaningHours: 'Por uma perspetiva de sustentabilidade (ODS), a limpeza diária do quarto durante estadias consecutivas é em geral suspensa. Por higiene, é feita limpeza gratuita a cada 7 dias.',
    cleaningRequest: 'Para troca de toalhas: até às 10:00, coloque o cartão vermelho («Change towels and Collect garbage») do lado do corredor da porta. Tapetes de banho na receção.',
    sheetExchange: 'Amenities e roupa de dormir estão disponíveis na prateleira do átrio.',
    noCleaning: 'Limpeza adicional (para além da sanitária) é paga. Solicite na receção até às 10:00. Quarto premium ¥2.640 (IVA incl.)/vez; outros quartos ¥1.100 (IVA incl.)/vez.',
    officialHP: 'Site oficial',
    preparing: 'Informações detalhadas estão sendo preparadas.',
    dinnerCouponLine1: 'Para o jantar desta noite',
    dinnerCouponLine2: 'Ótimos cupons de restaurante',
    amenitiesTitle: 'Comum a todos os tipos de quarto',
    amenitiesNote: '※Os equipamentos estão disponíveis no 1º andar.',
    amenityTowel: 'Toalha',
    amenityBathTowel: 'Toalha de banho',
    amenityDryer: 'Secador de cabelo',
    amenityDeodorant: 'Spray desodorizante',
    amenityShampoo: 'Shampoo',
    amenityConditioner: 'Condicionador',
    amenityHandSoap: 'Sabonete para as mãos',
    amenityToothbrush: 'Kit de escovação',
    amenityBodySoap: 'Sabonete corporal',
    floor1F: '■ 1F',
    floor2F: '■ 3F',
    freeSpaceNote: '',
    freeSpace: 'Bebida de boas-vindas',
    freeSpaceHours: '1F',
    iwateSachiko: 'Área de fumadores (1F)',
    wrappingVending: 'Máquinas de venda automática (1F, 3F)',
    souvenirVending1: 'Micro-ondas (3F, 4F, 6F, 8F, 10F)',
    vendingMachineNote: 'Cantinho de banda desenhada (3F, banda desenhada em inglês disponível)',
    laundryHours: 'O detergente é dosado automaticamente.',
  },
  'zh-TW': {
    hotelName: '',
    hotelTitle: '名古屋絲綢樹酒店',
    heroTitle: '酒店館內指南',
    welcomeMessage: '感謝您今天入住「名古屋絲綢樹酒店」。',
    welcomeMessage2: '',
    restaurantCoupon: '餐飲優惠券',
    checkInOut: '入住/退房時間',
    bath: '大廳・設施',
    breakfast: '早餐',
    dinner: '晚餐・優惠券',
    service: '館內樓層指南',
    wifi: 'Wi-Fi',
    lighting: '室內照明',
    longstay: '連泊清掃',
    lost: '遺失物品',
    quickCheckin: '快速入住',
    dinnerTab: '晚餐・優惠券',
    serviceTab: '館內樓層指南',
    close: '關閉',
    checkIn: '入住',
    checkOut: '退房',
    planNote: '※根據預訂方案，時間可能有所不同。',
    bbhMember: 'BBH會員',
    earlyCheckin: '提早入住',
    earlyCheckinFee: '每小時1,000日圓（最晚14:00）',
    lobbyDesc1: '歐式古董家具裝飾的優雅大廳。',
    lobbyDesc2: '讓您忘卻都市喧囂的寧靜空間。',
    lobbyDesc3: '可從大廳直接進入「星巴克咖啡」。',
    breakfastVenue: '早餐會場',
    breakfastFloor: '1樓餐廳',
    breakfastTime: '營業時間',
    breakfastTimeDetail: '6:00～9:00（最終入店8:45）',
    breakfastDesc: '歐式與和式兩種風格的自助早餐。歐洲與東方風格自助餐。',
    breakfastNotice: '營業時間可能會在不另行通知的情況下更改。',
    bathTitle: '大廳・設施',
    bathDescription: '男女分開大浴場 9F',
    operatingHours: '營業時間：',
    bathHours: '15:00~次日10:00',
    saunaNote: '(僅桑拿 1:00~5:00停止)',
    notice: '注意事項',
    bathNotice1: '※請自行從房間攜帶毛巾和洗漱用品。',
    bathNotice2: '※進入女性大浴場需要密碼。密碼將在前台提供。',
    freeService: '免費服務',
    bathServiceDesc: '我們免費提供乳酸菌飲料和冰棒。',
    breakfastTitle: '早餐（2F ALLY\'s Nagoya）',
    breakfastPrice: '成人 1,650日圓（含稅）／兒童（小學生）1,100日圓（含稅）',
    breakfastPriceLabel: '早餐費用',
    breakfastHours: '6:30～9:30（點餐截止9:00）',
    breakfastPurchaseNote: '※當日需用早餐的客人請於前台購買早餐券。',
    breakfastPreschoolFree: '※學齡前兒童免費。',
    breakfastDetail: '歐式角提供多種麵包、果醬、火腿與沙拉等；和風角提供蓋飯、茶泡飯、名古屋美食（きしめん、味噌豬排、どて煮、紅豆奶油）及麵包麥片、味噌湯、沙拉、飲品等自助。',
    breakfastMenuNote: '※自助菜單每日更換，部分菜品可能無法提供。',
    breakfastNote1: '※滿座時可能需要等待。',
    breakfastNote2: '※根據擁擠情況，營業時間可能會有所調整。',
    serviceTitle: '館內樓層指南',
    vendingMachine: '自動售貨機',
    alcoholNote: '(酒精飲料在5・7・9F)',
    microwave: '1F 洗浴用品自助區（14:00～25:00）',
    iceMaker: '製冰機（3F 投幣洗衣房內）',
    smoking: '吸煙區',
    trouserPress: '褲子熨燙機',
    trouserPressLocation: '各樓層電梯前',
    laundry: '投幣式洗衣房',
    laundryNote: '※洗衣機/每次200日圓 烘乾機/10分鐘100日圓（洗滌劑在前台免費提供）',
    wifiTitle: 'Wi-Fi',
    password: '密碼：',
    wifiAccessPoint: '請查看您房間內設置的「客房互聯網指南」以了解接入點。',
    copy: '複製',
    wifiCopyNote: '※點擊按鈕即可複製密碼',
    passwordCopied: '密碼已複製！',
    lostTitle: '遺失物品',
    lostText1: '原則上，酒店不會就遺失物品聯繫客人。',
    lostText2: '如果沒有聯繫，根據遺失物品法，將在3個月後處理。',
    lostText3: '但是，食品飲料將在當天處理。',
    lightingTitle: '室內照明',
    lightingDesc: '進入房間後，將房間鑰匙扣插入入口旁的電源插座即可點亮室內照明。',
    lightingNote: '※將鑰匙插入電源插座。',
    longstayTitle: '連泊清掃說明',
    cleaningHours: '基於SDGs理念，連泊期間原則上不進行客房清掃。為維持衛生，每7天提供一次免費清掃。',
    cleaningRequest: '需要更換毛巾時：請於10:00前將紅色標示牌（「Change towels and Collect garbage」）貼在房門走廊一側。浴墊請至櫃台索取。',
    sheetExchange: '洗浴用品與睡衣請在一樓大廳置物架自由取用。',
    noCleaning: '衛生清掃以外的額外清掃為付費服務。請於10:00前至櫃台申請。尊爵房每次2,640日圓（含稅），其他房型每次1,100日圓（含稅）。',
    officialHP: '官方網站',
    preparing: '詳細信息正在準備中。',
    dinnerCouponLine1: '今晚的晚餐',
    dinnerCouponLine2: '超值餐飲優惠券',
    amenitiesTitle: '全部屋類型共通',
    amenitiesNote: '※設施用品在1樓準備。',
    amenityTowel: '毛巾',
    amenityBathTowel: '浴巾',
    amenityDryer: '吹風機',
    amenityDeodorant: '除臭噴霧',
    amenityShampoo: '洗髮水',
    amenityConditioner: '護髮素',
    amenityHandSoap: '洗手液',
    amenityToothbrush: '牙刷套裝',
    amenityBodySoap: '沐浴露',
    floor1F: '■ 1F',
    floor2F: '■ 3F',
    freeSpaceNote: '',
    freeSpace: '迎賓飲料服務',
    freeSpaceHours: '1F',
    iwateSachiko: '吸煙區 1F',
    wrappingVending: '自動售貨機 1F・3F',
    souvenirVending1: '微波爐 3F・4F・6F・8F・10F',
    vendingMachineNote: '漫畫角 3F（備有英文漫畫）',
    laundryHours: '洗滌劑自動投入。',
  },
};

function getTranslations(lang: LanguageCode) {
  const base = translations.en as Record<string, unknown>;
  const selected = (translations as Record<string, Record<string, unknown> | undefined>)[lang] ?? {};
  const merged: Record<string, unknown> = { ...base, ...selected };

  for (const key of Object.keys(base)) {
    const val = selected[key];
    if (typeof val === "string" && val.trim() === "") {
      merged[key] = base[key];
    }
  }

  return merged as typeof translations.en;
}

type PageProps = {
  params?: Promise<Record<string, string | string[]>>;
  searchParams?: Promise<Record<string, string | string[]>>;
};

export default function Home(props: PageProps) {
  use(props.params ?? Promise.resolve({}));
  use(props.searchParams ?? Promise.resolve({}));

  const { language: selectedLanguage, setLanguage: setSelectedLanguage } = useLanguage();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showOtherLanguages, setShowOtherLanguages] = useState(false);
  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [breakfastImageIndex, setBreakfastImageIndex] = useState(0);
  const servicesGridRef = useRef<HTMLDivElement>(null);
  const [visibleServices, setVisibleServices] = useState<Set<string>>(new Set());
  const [headerLogoMounted, setHeaderLogoMounted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setHeaderLogoMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

  const heroImages = [
    '/main-page/gallery_01.jpg',
    '/main-page/gallery_02.jpg',
    '/main-page/gallery_05.jpg',
    '/main-page/gallery_06.jpg',
    '/main-page/gallery_07.jpg',
    '/main-page/gallery_08.jpg',
    '/main-page/gallery_13.jpg',
    '/main-page/gallery_16.jpg',
  ];

  const breakfastImages = [
    '/main-page/10-topic-picture/morning-picture/スクリーンショット 2026-03-06 13.06.49.png',
    '/main-page/10-topic-picture/morning-picture/スクリーンショット 2026-03-06 13.06.59.png',
    '/main-page/10-topic-picture/morning-picture/スクリーンショット 2026-03-06 13.07.06.png',
    '/main-page/10-topic-picture/morning-picture/スクリーンショット 2026-03-06 13.07.13.png',
    '/main-page/10-topic-picture/morning-picture/スクリーンショット 2026-03-06 13.07.27.png',
    '/main-page/10-topic-picture/morning-picture/スクリーンショット 2026-03-06 13.07.32.png',
  ];

  const t = getTranslations(selectedLanguage);

  // 画像のスライドショー（4秒ごとに切り替え）
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  useEffect(() => {
    if (selectedService !== 'breakfast') return;

    const interval = setInterval(() => {
      setBreakfastImageIndex((prevIndex) => (prevIndex + 1) % breakfastImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [selectedService, breakfastImages.length]);

  // サービスアイコンのスクロールアニメーション
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const serviceId = entry.target.getAttribute('data-service-id');
            if (serviceId) {
              setVisibleServices((prev) => new Set(prev).add(serviceId));
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const serviceElements = servicesGridRef.current?.querySelectorAll('[data-service-id]');
    serviceElements?.forEach((el) => observer.observe(el));

    return () => {
      serviceElements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // ドロップダウン外をクリックした時に閉じる
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
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showOtherLanguages]);

  const services = [
    { 
      icon: (
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center">
          <Image
            src="/main-page/icon-matome/icon-carry.svg"
            alt={t.checkInOut}
            width={112}
            height={112}
            className="w-full h-full object-contain"
            unoptimized
          />
        </div>
      ), 
      titleKey: 'checkInOut' as const,
      id: 'checkin',
      textColor: 'text-[#85B510]'
    },
    { 
      icon: (
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center">
          <Image
            src="/main-page/icon-matome/icon-food.svg"
            alt={t.breakfast}
            width={112}
            height={112}
            className="w-full h-full object-contain"
            unoptimized
          />
        </div>
      ), 
      titleKey: 'breakfast' as const,
      id: 'breakfast',
      textColor: 'text-[#85B510]'
    },
    { 
      icon: (
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center">
          <Image
            src="/main-page/icon-matome/icon-beer.svg"
            alt={t.dinner}
            width={112}
            height={112}
            className="w-full h-full object-contain"
            unoptimized
          />
        </div>
      ), 
      titleKey: 'dinner' as const,
      id: 'dinner', 
      highlighted: true,
      textColor: 'text-white'
    },
    { 
      icon: (
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center">
          <Image
            src="/main-page/icon-matome/icon-washmachine.svg"
            alt={t.service}
            width={112}
            height={112}
            className="w-full h-full object-contain"
            unoptimized
          />
        </div>
      ), 
      titleKey: 'service' as const,
      id: 'service',
      textColor: 'text-[#85B510]'
    },
    { 
      icon: (
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center">
          <Image
            src="/main-page/icon-matome/icon-Wifi.svg"
            alt={t.wifi}
            width={112}
            height={112}
            className="w-full h-full object-contain"
            unoptimized
          />
        </div>
      ), 
      titleKey: 'wifi' as const,
      id: 'wifi',
      textColor: 'text-[#85B510]'
    },
    { 
      icon: (
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center">
          <Image
            src={encodeURI('/main-page/icon-matome/icon-bed (1).svg')}
            alt={t.longstay}
            width={112}
            height={112}
            className="w-full h-full object-contain"
            unoptimized
          />
        </div>
      ), 
      titleKey: 'longstay' as const,
      id: 'longstay',
      textColor: 'text-[#85B510]'
    },
  ];

  const mainLanguages: Array<{ code: LanguageCode; flag: string; label: string }> = [
    { code: 'en', flag: '🇺🇸', label: 'English' },
    { code: 'zh', flag: '🇨🇳', label: '中文' },
    { code: 'zh-TW', flag: '🇹🇼', label: '繁體中文' },
    { code: 'ko', flag: '🇰🇷', label: '한국어' },
    { code: 'ja', flag: '🇯🇵', label: '日本語' },
  ];

  const otherLanguages: Array<{ code: LanguageCode; flag: string; label: string }> = [
    { code: 'th', flag: '🇹🇭', label: 'ไทย' },
    { code: 'vi', flag: '🇻🇳', label: 'Tiếng Việt' },
    { code: 'tl', flag: '🇵🇭', label: 'Tagalog' },
    { code: 'id', flag: '🇮🇩', label: 'Bahasa Indonesia' },
    { code: 'ms', flag: '🇲🇾', label: 'Bahasa Melayu' },
    { code: 'fr', flag: '🇫🇷', label: 'Français' },
    { code: 'de', flag: '🇩🇪', label: 'Deutsch' },
    { code: 'es', flag: '🇪🇸', label: 'Español' },
    { code: 'it', flag: '🇮🇹', label: 'Italiano' },
    { code: 'pt', flag: '🇵🇹', label: 'Português' },
  ];

return (
    <div className="min-h-screen bg-[#f9f2d4] overflow-x-hidden">
    {/* ヘッダー */}
    <header className="bg-white/98 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-1.5 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-1 py-1.5 sm:gap-2 sm:py-2">
          {/* 左側：ロゴ＋ホテル名 */}
            <div className="flex items-center gap-2 sm:gap-3 shrink min-w-0 flex-1">
              <div className="relative h-10 w-24 shrink-0 overflow-hidden sm:h-12 sm:w-28 md:h-14 md:w-32 [clip-path:inset(0_20%_0_0)]">
                {headerLogoMounted && (
                  <Image
                    src="/main-page/icon-hotelnagoya.png"
                    alt=""
                    fill
                    className="object-contain object-left"
                    sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 128px"
                    unoptimized
                  />
                )}
              </div>
              <h1 className="font-sans text-sm font-semibold tracking-tight text-gray-800 truncate sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                ホテル シルク・トゥリー名古屋
              </h1>
            </div>

            {/* 右側：言語選択と飲食店クーポンボタン */}
            <div className="flex items-center justify-end shrink-0 space-x-0.5 sm:space-x-1 md:space-x-2 flex-nowrap ml-1">
              {/* 言語選択 */}
              <div ref={languageDropdownRef} className="flex items-center space-x-0 sm:space-x-0.5 md:space-x-1 relative flex-nowrap shrink-0">
                {/* Another Language ボタン */}
                <button
                  onClick={() => setShowOtherLanguages(!showOtherLanguages)}
                  className={`flex flex-col items-center p-0.5 sm:p-1 md:p-1.5 rounded transition-colors ${
                    showOtherLanguages
                      ? 'bg-blue-50'
                      : 'hover:bg-gray-50'
                  }`}
                  title="Other Languages"
                >
                  <span className="flex items-center justify-center w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-7 md:h-7 text-xs sm:text-base md:text-xl leading-none">🌐</span>
                  <span className="text-[6px] sm:text-[8px] md:text-[10px] text-gray-700 leading-tight mt-0.5">Another</span>
                </button>

                {/* 他の言語ドロップダウン */}
                {showOtherLanguages && (
                  <div 
                    className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-50 max-h-[60vh] sm:max-h-[300px] overflow-y-auto w-[calc(100vw-1rem)] sm:w-auto max-w-[calc(100vw-1rem)] sm:max-w-none"
                  >
                    <div className="grid grid-cols-2 gap-2">
                      {otherLanguages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSelectedLanguage(lang.code);
                            setShowOtherLanguages(false);
                          }}
                          className={`flex flex-col items-center p-1.5 sm:p-2 rounded transition-colors ${
                            selectedLanguage === lang.code
                              ? 'bg-blue-50'
                              : 'hover:bg-gray-50'
                          }`}
                          title={lang.label}
                        >
                          <span className="text-base sm:text-lg md:text-2xl leading-none mb-1">{lang.flag}</span>
                          <span className="text-[10px] sm:text-xs text-gray-700 leading-tight text-center">{lang.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 基本5言語 */}
                {mainLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedLanguage(lang.code);
                      setShowOtherLanguages(false);
                    }}
                    className={`flex flex-col items-center p-0.5 sm:p-1 md:p-1.5 rounded transition-colors ${
                      selectedLanguage === lang.code
                        ? 'bg-blue-50'
                        : 'hover:bg-gray-50'
                    }`}
                    title={lang.label}
                  >
                    <span className="flex items-center justify-center w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-7 md:h-7 text-xs sm:text-base md:text-xl leading-none">{lang.flag}</span>
                    <span className="text-[6px] sm:text-[8px] md:text-[10px] text-gray-700 leading-tight mt-0.5">{lang.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ヒーローセクション */}
      <section className="relative bg-gray-900">
        <div className="relative h-96 sm:h-[500px] overflow-hidden">
          {heroImages.map((src, index) => (
            <div
              key={src}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={src}
                alt="Hotel Silk Tree Nagoya"
                fill
                className="object-cover"
                priority={index === 0}
                sizes="100vw"
                unoptimized
              />
            </div>
          ))}
          {/* オーバーレイ */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
            <div className="text-center p-8 sm:p-12">
              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-2xl">
                {t.heroTitle}
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* ウェルカムメッセージ */}
      <section className="bg-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            {t.welcomeMessage}
          </p>
        </div>
      </section>

      {/* サービスグリッド */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={servicesGridRef} className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {services.map((service, index) => (
              service.id === 'dinner' ? (
                <Link
                  key={service.id}
                  data-service-id={service.id}
                  href="/coupon"
                  className={`p-3 sm:p-4 md:p-6 rounded-lg transition-all duration-700 ease-out flex flex-col items-center justify-center min-h-[100px] sm:min-h-[120px] md:min-h-[140px] ${
                    visibleServices.has(service.id)
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                  style={{ 
                    backgroundColor: '#85B510',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
                    transitionDelay: visibleServices.has(service.id) ? `${index * 100}ms` : '0ms'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(133, 181, 16, 0.6), 0 25px 50px -12px rgba(0, 0, 0, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)';
                  }}
                >
                  <div className="mb-3 sm:mb-4 flex justify-center items-center shrink-0">
                    {service.icon}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-center leading-tight text-white wrap-break-word px-1">
                    {t[service.titleKey]}
                  </div>
                </Link>
              ) : (
                <button
                  key={service.id}
                  data-service-id={service.id}
                  onClick={() => {
                    if (service.id === 'breakfast') {
                      setBreakfastImageIndex(0);
                    }
                    setSelectedService(service.id);
                  }}
                  className={`bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-lg hover:shadow-[0_0_25px_rgba(62,134,104,0.6)] transition-all duration-300 ease-out flex flex-col items-center justify-center min-h-[100px] sm:min-h-[120px] md:min-h-[140px] hover:scale-105 ${
                    visibleServices.has(service.id)
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                  style={{
                    transitionDelay: visibleServices.has(service.id) ? `${index * 100}ms` : '0ms'
                  }}
                >
                  <div className="mb-3 sm:mb-4 flex justify-center items-center shrink-0">
                    {service.icon}
                  </div>
                  <div className={`text-xs sm:text-sm font-semibold text-center leading-tight wrap-break-word px-1 ${service.textColor || 'text-blue-800'}`}>
                    {t[service.titleKey]}
                  </div>
                </button>
              )
            ))}
          </div>
        </div>
      </section>

      {/* 飲食店クーポンとグリーンハウスボタン */}
      <section className="bg-white py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {/* 飲食店クーポンボタン */}
            <Link
              href="/coupon"
              className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] transition-all duration-300 min-h-[200px] sm:min-h-[220px] sm:col-span-2 w-full group hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(145deg, #059669, #047857)',
                padding: '3px',
              }}
            >
              {/* 背景画像グリッド（3枚：寿司・焼肉・串焼き） */}
              <div className="absolute inset-0 grid grid-cols-3 gap-0.5">
                <div className="relative overflow-hidden">
                  <Image
                    src="/main-page/P028082381_480.jpg"
                    alt="お刺身"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="relative overflow-hidden">
                  <Image
                    src={encodeURI("/main-page/スクリーンショット 2026-03-18 19.04.45.png")}
                    alt="焼肉"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="relative overflow-hidden">
                  <Image
                    src="/main-page/150x150_square_cc26fddb73735b04c8ef569a22c13a20.jpg"
                    alt="串焼き"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              
              {/* オーバーレイ */}
              <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/50 to-black/60 group-hover:from-black/50 group-hover:via-black/60 group-hover:to-black/70 transition-all duration-300 rounded-lg"></div>
              
              {/* 内側の光沢枠 */}
              <div className="absolute inset-[3px] rounded-[10px] border-2 border-white/20 pointer-events-none"></div>
              
              {/* テキストコンテンツ */}
              <div className="relative z-10 p-6 sm:p-8 flex flex-col items-center justify-center min-h-[194px] sm:min-h-[214px] gap-3">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight mb-2" style={{ 
                    fontFamily: '"Hiragino Maru Gothic ProN", "Hiragino Sans", "Yu Gothic", "Meiryo", sans-serif',
                    color: '#FFE66D',
                    textShadow: '0 0 20px rgba(255, 230, 109, 0.8), 0 0 10px rgba(255, 200, 0, 0.6), 3px 3px 6px rgba(0, 0, 0, 0.9), -1px -1px 2px rgba(255, 255, 255, 0.3)',
                    letterSpacing: '0.05em'
                  }}>
                    {t.dinnerCouponLine1}
                  </div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-black leading-tight" style={{ 
                    fontFamily: '"Hiragino Maru Gothic ProN", "Hiragino Sans", "Yu Gothic", "Meiryo", sans-serif',
                    color: '#FFFFFF',
                    textShadow: '0 0 15px rgba(255, 140, 0, 0.7), 0 0 8px rgba(255, 100, 0, 0.5), 2px 2px 6px rgba(0, 0, 0, 0.9), -1px -1px 2px rgba(255, 200, 0, 0.4)',
                    letterSpacing: '0.08em'
                  }}>
                    {t.dinnerCouponLine2}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ウェルカムメッセージ */}
      <section className="bg-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            {t.welcomeMessage}
          </p>
        </div>
      </section>

      {/* モーダルダイアログ */}
      {selectedService && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4"
          onClick={() => setSelectedService(null)}
        >
          <div 
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-4 sm:p-6 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedService === 'checkin' && (
              <>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">{t.checkInOut}</h3>
                <div className="space-y-3 mb-4">
                  <div className="text-sm sm:text-base text-gray-700">
                    <span className="font-semibold">{t.checkIn}</span> 15:00〜
                  </div>
                  <div className="text-sm sm:text-base text-gray-700">
                    <span className="font-semibold">{t.checkOut}</span> 〜11:00
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-500">
                  {t.planNote}
                </p>
                <button
                  onClick={() => setSelectedService(null)}
                  className="mt-6 w-full bg-white hover:bg-gray-50 text-gray-600 border border-gray-300 px-4 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium transition-colors"
                >
                  {t.close}
                </button>
              </>
            )}
            {selectedService === 'breakfast' && (
              <>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                  {t.breakfastTitle}
                </h3>
                
                {/* 朝食セクション */}
                <div className="mb-6">
                    <div className="space-y-3 mb-4">
                      <div className="text-gray-700">
                        <span className="font-semibold">{t.breakfastTime}</span> {t.breakfastTimeDetail}
                      </div>
                      <div className="text-gray-700">
                        <span className="font-semibold">{t.breakfastPriceLabel}</span> {t.breakfastPrice}
                      </div>
                      <p className="text-sm text-gray-600">{t.breakfastPurchaseNote}</p>
                      <p className="text-sm text-gray-600">{t.breakfastPreschoolFree}</p>
                    </div>
                  {/* 朝食の画像 */}
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <div className="relative w-full h-64">
                      {(() => {
                        const safeIndex = breakfastImages.length > 0 ? breakfastImageIndex % breakfastImages.length : 0;
                        const breakfastSrc = breakfastImages[safeIndex] || breakfastImages[0];
                        if (!breakfastSrc) return <div className="w-full h-64 bg-gray-200 animate-pulse rounded-lg" />;
                        return (
                          <Image
                            src={breakfastSrc}
                            alt={selectedLanguage === 'ja' ? '朝食' : selectedLanguage === 'en' ? 'Breakfast' : selectedLanguage === 'zh' ? '早餐' : selectedLanguage === 'ko' ? '조식' : 'Breakfast'}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 672px"
                            unoptimized
                          />
                        );
                      })()}

                      <button
                        type="button"
                        aria-label="Previous photo"
                        onClick={() =>
                          setBreakfastImageIndex(
                            (prevIndex) =>
                              (prevIndex - 1 + breakfastImages.length) % breakfastImages.length
                          )
                        }
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/55 text-white rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-sm transition-colors"
                      >
                        <span className="text-2xl leading-none">‹</span>
                      </button>

                      <button
                        type="button"
                        aria-label="Next photo"
                        onClick={() =>
                          setBreakfastImageIndex(
                            (prevIndex) => (prevIndex + 1) % breakfastImages.length
                          )
                        }
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/55 text-white rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-sm transition-colors"
                      >
                        <span className="text-2xl leading-none">›</span>
                      </button>
                    </div>
                  </div>
                    <div className="space-y-3 text-gray-700">
                    <p className="font-semibold text-lg">{t.breakfastDesc}</p>
                    <p className="text-[#3E8668] font-bold text-base">{t.breakfastCatchphrase}</p>
                    <p className="text-sm leading-relaxed">{t.breakfastDetail}</p>
                    <p className="text-sm text-gray-600">{t.breakfastMenuNote}</p>
                    <p className="text-sm text-gray-600">{t.breakfastNotice}</p>
                    <p className="text-xs text-gray-500">{t.breakfastNote1} {t.breakfastNote2}</p>
                    </div>
                </div>

                <button
                  onClick={() => setSelectedService(null)}
                  className="w-full bg-white hover:bg-gray-50 text-gray-600 border border-gray-300 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  {t.close}
                </button>
              </>
            )}
            {selectedService === 'service' && (
              <>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{t.serviceTitle}</h3>
                
                {/* 1F */}
                <div className="mb-6">
                  <h4 className="font-bold text-lg text-gray-900 mb-3">{t.floor1F}</h4>
                  
                  {/* 1F画像 */}
                  <div className="mb-4">
                    <div className="w-full">
                      <Image
                        src="/main-page/gallery_07.jpg"
                        alt="1Fサービスコーナー"
                        width={600}
                        height={400}
                        className="w-full h-auto rounded-lg border border-gray-200"
                      />
                    </div>
                  </div>
                  
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#3E8668] rounded-full mr-3 mt-2 shrink-0"></span>
                      <div>
                        <div className="font-semibold">{t.freeSpace}</div>
                        <div className="text-sm text-gray-600 mt-1">{t.freeSpaceHours}</div>
                      </div>
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#3E8668] rounded-full mr-3"></span>
                      {t.microwave}
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#3E8668] rounded-full mr-3"></span>
                      {t.iwateSachiko}
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#3E8668] rounded-full mr-3"></span>
                      {t.wrappingVending}
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#3E8668] rounded-full mr-3"></span>
                      {t.souvenirVending1}
                    </li>
                  </ul>
                  
                  {/* 注意書き */}
                  {t.freeSpaceNote && (
                    <div className="bg-yellow-50 rounded-lg p-4 mt-4 border border-yellow-200">
                      <p className="text-sm text-gray-700 leading-relaxed">{t.freeSpaceNote}</p>
                    </div>
                  )}
                </div>

                {/* 3F */}
                <div className="mb-6">
                  <h4 className="font-bold text-lg text-gray-900 mb-3">{t.floor2F}</h4>
                  
                  {/* 2F画像 */}
                  <div className="mb-4 w-full">
                    <Image
                      src="/main-page/gallery_13.jpg"
                      alt="2Fサービスコーナー"
                      width={800}
                      height={600}
                      className="w-full h-auto rounded-lg border border-gray-200"
                    />
                  </div>
                  
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#3E8668] rounded-full mr-3"></span>
                      {t.vendingMachine}
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#3E8668] rounded-full mr-3"></span>
                      {t.iceMaker}
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#3E8668] rounded-full mr-3"></span>
                      {t.vendingMachineNote}
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#3E8668] rounded-full mr-3 mt-2 shrink-0"></span>
                      <div>
                        <div className="font-semibold">{t.laundry}</div>
                        <div className="text-sm text-gray-600 mt-1">{t.laundryHours}</div>
                      </div>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => setSelectedService(null)}
                  className="mt-6 w-full bg-white hover:bg-gray-50 text-gray-600 border border-gray-300 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  {t.close}
                </button>
              </>
            )}
            {selectedService === 'wifi' && (
              <>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{t.wifiTitle}</h3>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-700 mb-4">
                    {t.wifiAccessPoint}
                  </p>
                  <div className="space-y-3">
                    <div className="rounded-lg bg-[#E8F5F0] border border-[#3E8668] px-4 py-3 flex items-center justify-between">
                      <div className="flex items-center">
                    <span className="font-bold text-gray-900">{t.password}</span>
                        <span className="font-bold text-[#3E8668] ml-2">silktree</span>
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText('silktree');
                          alert(t.passwordCopied);
                        }}
                        className="ml-4 bg-[#3E8668] hover:bg-[#2D6550] text-white px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-300 flex items-center gap-1 shrink-0 shadow-lg hover:shadow-[0_0_20px_rgba(62,134,104,0.6)] hover:scale-105 active:scale-95"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        {t.copy}
                      </button>
                    </div>
                    <p className="text-xs text-gray-600 text-center">
                      {t.wifiCopyNote}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="mt-6 w-full bg-white hover:bg-gray-50 text-gray-600 border border-gray-300 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  {t.close}
                </button>
              </>
            )}
            {selectedService === 'longstay' && (
              <>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{t.longstayTitle}</h3>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <p className="text-base text-gray-700 leading-relaxed mb-4">
                      {t.cleaningHours.split(/(11:00[～\-]?\s*15:00|11:00\s*(to|～|-)\s*15:00)/).map((part, index) => {
                        if (/11:00[～\-]?\s*15:00|11:00\s*(to|～|-)\s*15:00/.test(part)) {
                          return <span key={index} className="font-semibold text-[#3E8668]">{part}</span>;
                        }
                        return <span key={index}>{part}</span>;
                      })}
                    </p>
                    <p className="text-base text-gray-700 leading-relaxed mb-4">
                      {t.cleaningRequest.split(/(「[^」]+」|"[^"]+"|'[^']+'|11:00[までまでに]|11:00|before\s+11:00|by\s+11:00)/i).map((part, index) => {
                        if (/11:00[までまでに]|11:00|before\s+11:00|by\s+11:00/i.test(part)) {
                          return <span key={index} className="font-semibold text-red-600">{part}</span>;
                        }
                        if (/「[^」]+」|"[^"]+"|'[^']+'/.test(part)) {
                          return <span key={index} className="font-semibold text-[#3E8668]">{part}</span>;
                        }
                        return <span key={index}>{part}</span>;
                      })}
                    </p>
                    <div className="mt-4 rounded-lg overflow-hidden border border-gray-200 bg-white">
                      <Image
                        src={encodeURI("/main-page/スクリーンショット 2026-03-18 16.19.52.png")}
                        alt="タオル交換・ゴミ回収の赤い札"
                        width={400}
                        height={300}
                        className="w-full h-auto object-contain"
                        unoptimized
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedService(null)}
                  className="mt-6 w-full bg-white hover:bg-gray-50 text-gray-600 border border-gray-300 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  {t.close}
                </button>
              </>
            )}
            {selectedService !== 'checkin' && selectedService !== 'breakfast' && selectedService !== 'service' && selectedService !== 'wifi' && selectedService !== 'longstay' && (
              <>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {services.find(s => s.id === selectedService) ? t[services.find(s => s.id === selectedService)!.titleKey] : ''}
                </h3>
                <p className="text-gray-700 mb-4">
                  {t.preparing}
                </p>
                <button
                  onClick={() => setSelectedService(null)}
                  className="w-full bg-white hover:bg-gray-50 text-gray-600 border border-gray-300 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  {t.close}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* フッター */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
            {/* 左側：ホテル情報 */}
            <div className="md:col-span-2 flex flex-col items-center text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                {t.hotelName ? (
                  <>
                    {t.hotelName}<br />{t.hotelTitle}
                  </>
                ) : (
                  <>{t.hotelTitle}</>
                )}
              </h3>
              <div className="space-y-2 text-sm text-gray-700 mb-6">
                <p>〒460-0003<br />{selectedLanguage === 'ja' ? '愛知県名古屋市中区錦２丁目２０−５' : selectedLanguage === 'en' ? '2-20-5 Nishiki, Naka-ku, Nagoya, Aichi 460-0003' : selectedLanguage === 'zh' ? '爱知县名古屋市中区锦2丁目20-5' : '아이치현 나고야시 나카구 니시키 2-20-5'}</p>
                <p>TEL 052-222-1113</p>
              </div>
              <div className="mt-6">
                <Link
                  href="https://www.silk-tree.jp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-col items-center space-y-2 hover:opacity-80 transition-opacity"
                >
                  <div className="relative w-32 h-14 sm:w-40 sm:h-16">
                    <Image
                      src="/main-page/icon-hotelnagoya.png"
                      alt={t.officialHP}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 128px, 160px"
                      unoptimized
                    />
                  </div>
                </Link>
              </div>
            </div>

            {/* 右側：Googleマップ（Androidではiframeが表示されない場合があるため「地図を開く」リンクを併設） */}
            <div className="md:col-span-3">
              <div className="w-full h-64 sm:h-80 bg-gray-200 rounded-lg overflow-hidden border border-gray-300 shadow-sm">
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent('愛知県名古屋市中区錦2丁目20-5 ホテルシルク・トゥリー名古屋')}&output=embed&hl=ja&z=17`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  allow="geolocation; fullscreen"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                  title="ホテルシルク・トゥリー名古屋"
                />
              </div>
              <MapFallbackLink />
            </div>
          </div>

          {/* コピーライト */}
          <div className="border-t border-gray-200 pt-8 text-center">
            <p className="text-xs text-gray-500">
              Copyright © BREEZBAY HOTEL All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
