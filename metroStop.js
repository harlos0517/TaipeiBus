var metroStop = [
	{"id":   1, "coordinates": [ 121.569576,25.032830 ], "code": "R02" , "name": { "zh": "象山", "en": "Xiangshan" } },
	{"id":   2, "coordinates": [ 121.563292,25.033102 ], "code": "R03" , "name": { "zh": "台北101\/世貿", "en": "Taipei 101\/World Trade Center" } },
	{"id":   3, "coordinates": [ 121.553526,25.033326 ], "code": "R04" , "name": { "zh": "信義安和", "en": "Xinyi Anhe" } },
	{"id":   4, "coordinates": [ 121.543551,25.032943 ], "code": "R05" , "name": { "zh": "大安", "en": "Daan" } },
	{"id":   5, "coordinates": [ 121.534882,25.033396 ], "code": "R06" , "name": { "zh": "大安森林公園", "en": "Daan Park" } },
	{"id":   6, "coordinates": [ 121.528739,25.033847 ], "code": "R07" , "name": { "zh": "東門", "en": "Dongmen" } },
	{"id":   7, "coordinates": [ 121.518270,25.032729 ], "code": "R08" , "name": { "zh": "中正紀念堂", "en": "Chiang Kai-Shek Memorial Hall" } },
	{"id":   8, "coordinates": [ 121.516040,25.041256 ], "code": "R09" , "name": { "zh": "台大醫院", "en": "NTU Hospital" } },
	{"id":   9, "coordinates": [ 121.517532,25.046255 ], "code": "R10" , "name": { "zh": "台北車站", "en": "Taipei Main Station" } },
	{"id":  10, "coordinates": [ 121.520392,25.052685 ], "code": "R11" , "name": { "zh": "中山", "en": "Zhongshan" } },
	{"id":  11, "coordinates": [ 121.520627,25.057805 ], "code": "R12" , "name": { "zh": "雙連", "en": "Shuanglian" } },
	{"id":  12, "coordinates": [ 121.519320,25.062905 ], "code": "R13" , "name": { "zh": "民權西路", "en": "Minquan W. Rd." } },
	{"id":  13, "coordinates": [ 121.520118,25.071353 ], "code": "R14" , "name": { "zh": "圓山", "en": "Yuanshan" } },
	{"id":  14, "coordinates": [ 121.525078,25.084873 ], "code": "R15" , "name": { "zh": "劍潭", "en": "Jiantan" } },
	{"id":  15, "coordinates": [ 121.526230,25.093535 ], "code": "R16" , "name": { "zh": "士林", "en": "Shilin" } },
	{"id":  16, "coordinates": [ 121.522514,25.103060 ], "code": "R17" , "name": { "zh": "芝山", "en": "Zhishan" } },
	{"id":  17, "coordinates": [ 121.518848,25.109721 ], "code": "R18" , "name": { "zh": "明德", "en": "Mingde" } },
	{"id":  18, "coordinates": [ 121.515559,25.114523 ], "code": "R19" , "name": { "zh": "石牌", "en": "Shipai" } },
	{"id":  19, "coordinates": [ 121.506252,25.120872 ], "code": "R20" , "name": { "zh": "唭哩岸", "en": "Qilian" } },
	{"id":  20, "coordinates": [ 121.501132,25.125491 ], "code": "R21" , "name": { "zh": "奇岩", "en": "Qiyan" } },
	{"id":  21, "coordinates": [ 121.498633,25.131841 ], "code": "R22" , "name": { "zh": "北投", "en": "Beitou" } },
	{"id":  22, "coordinates": [ 121.502530,25.136933 ], "code": "R22A", "name": { "zh": "新北投", "en": "Xinbeitou" } },
	{"id":  23, "coordinates": [ 121.485444,25.137474 ], "code": "R23" , "name": { "zh": "復興崗", "en": "Fuxinggang" } },
	{"id":  24, "coordinates": [ 121.473410,25.130969 ], "code": "R24" , "name": { "zh": "忠義", "en": "Zhongyi" } },
	{"id":  25, "coordinates": [ 121.467102,25.125633 ], "code": "R25" , "name": { "zh": "關渡", "en": "Guandu" } },
	{"id":  26, "coordinates": [ 121.459479,25.136940 ], "code": "R26" , "name": { "zh": "竹圍", "en": "Zhuwei" } },
	{"id":  27, "coordinates": [ 121.458872,25.154042 ], "code": "R27" , "name": { "zh": "紅樹林", "en": "Hongshulin" } },
	{"id":  28, "coordinates": [ 121.445561,25.167818 ], "code": "R28" , "name": { "zh": "淡水", "en": "Tamsui" } }, //FLAG

	{"id":  29, "coordinates": [ 121.420500,24.960120 ], "code": "BL01", "name": { "zh": "頂埔", "en": "Dingpu" } },
	{"id":  30, "coordinates": [ 121.436072,24.966726 ], "code": "BL02", "name": { "zh": "永寧", "en": "Yongning" } },
	{"id":  31, "coordinates": [ 121.444362,24.973094 ], "code": "BL03", "name": { "zh": "土城", "en": "Tucheng" } },
	{"id":  32, "coordinates": [ 121.448786,24.985339 ], "code": "BL04", "name": { "zh": "海山", "en": "Haishan" } },
	{"id":  33, "coordinates": [ 121.452514,24.998037 ], "code": "BL05", "name": { "zh": "亞東醫院", "en": "Far Eastern Hospital" } },
	{"id":  34, "coordinates": [ 121.459409,25.008619 ], "code": "BL06", "name": { "zh": "府中", "en": "Fuzhong" } },
	{"id":  35, "coordinates": [ 121.462302,25.013618 ], "code": "BL07", "name": { "zh": "板橋", "en": "Banqiao" } },
	{"id":  36, "coordinates": [ 121.468361,25.023738 ], "code": "BL08", "name": { "zh": "新埔", "en": "Xinpu" } },
	{"id":  37, "coordinates": [ 121.472390,25.030010 ], "code": "BL09", "name": { "zh": "江子翠", "en": "Jianzicui" } },
	{"id":  38, "coordinates": [ 121.499826,25.035280 ], "code": "BL10", "name": { "zh": "龍山寺", "en": "Longshan Temple" } },
	{"id":  39, "coordinates": [ 121.508303,25.042090 ], "code": "BL11", "name": { "zh": "西門", "en": "Ximen" } },
	{"id":  40, "coordinates": [ 121.523208,25.044823 ], "code": "BL13", "name": { "zh": "善導寺", "en": "Shandao Temple" } },
	{"id":  41, "coordinates": [ 121.532905,25.042356 ], "code": "BL14", "name": { "zh": "忠孝新生", "en": "Zhongxiao Xinsheng" } },
	{"id":  42, "coordinates": [ 121.543767,25.041629 ], "code": "BL15", "name": { "zh": "忠孝復興", "en": "Zhongxiao Fuxing" } },
	{"id":  43, "coordinates": [ 121.551098,25.041478 ], "code": "BL16", "name": { "zh": "忠孝敦化", "en": "Zhongxiao Dunhua" } },
	{"id":  44, "coordinates": [ 121.557802,25.041349 ], "code": "BL17", "name": { "zh": "國父紀念館", "en": "Sun Yat-Sen Memorial Hall" } },
	{"id":  45, "coordinates": [ 121.565228,25.041171 ], "code": "BL18", "name": { "zh": "市政府", "en": "Taipei City Hall" } },
	{"id":  46, "coordinates": [ 121.576293,25.040859 ], "code": "BL19", "name": { "zh": "永春", "en": "Yongchun" } },
	{"id":  47, "coordinates": [ 121.582522,25.045055 ], "code": "BL20", "name": { "zh": "後山埤", "en": "Houshanpi" } },
	{"id":  48, "coordinates": [ 121.593268,25.050461 ], "code": "BL21", "name": { "zh": "昆陽", "en": "Kunyang" } },
	{"id":  49, "coordinates": [ 121.606686,25.052116 ], "code": "BL22", "name": { "zh": "南港", "en": "Nangang" } },
	{"id":  50, "coordinates": [ 121.617500,25.055288 ], "code": "BL23", "name": { "zh": "南港展覽館", "en": "Taipei Nangang Exhibition Center" } },

	{"id":  51, "coordinates": [ 121.537584,24.957855 ], "code": "G01" , "name": { "zh": "新店", "en": "Xindian" } },
	{"id":  52, "coordinates": [ 121.541310,24.967393 ], "code": "G02" , "name": { "zh": "新店區公所", "en": "Xindian District Office" } },
	{"id":  53, "coordinates": [ 121.542942,24.975169 ], "code": "G03" , "name": { "zh": "七張", "en": "Qizhang" } },
	{"id":  54, "coordinates": [ 121.530339,24.971907 ], "code": "G03A", "name": { "zh": "小碧潭", "en": "Xiaobitan" } },
	{"id":  55, "coordinates": [ 121.541352,24.982899 ], "code": "G04" , "name": { "zh": "大坪林", "en": "Dapinglin" } },
	{"id":  56, "coordinates": [ 121.540604,24.992128 ], "code": "G05" , "name": { "zh": "景美", "en": "Jingmei" } },
	{"id":  57, "coordinates": [ 121.539051,25.001853 ], "code": "G06" , "name": { "zh": "萬隆", "en": "Wanlong" } },
	{"id":  58, "coordinates": [ 121.534216,25.014908 ], "code": "G07" , "name": { "zh": "公館", "en": "Gongguan" } },
	{"id":  59, "coordinates": [ 121.528168,25.020725 ], "code": "G08" , "name": { "zh": "台電大樓", "en": "Taipower Building" } },
	{"id":  60, "coordinates": [ 121.522873,25.026357 ], "code": "G09" , "name": { "zh": "古亭", "en": "Guting" } },
	{"id":  61, "coordinates": [ 121.510857,25.035547 ], "code": "G11" , "name": { "zh": "小南門", "en": "Xiaonanmen" } },
	{"id":  62, "coordinates": [ 121.510184,25.049554 ], "code": "G13" , "name": { "zh": "北門", "en": "Beimen" } },
	{"id":  63, "coordinates": [ 121.533075,25.052015 ], "code": "G15" , "name": { "zh": "松江南京", "en": "Songjiang Nanjing" } },
	{"id":  64, "coordinates": [ 121.544011,25.052319 ], "code": "G16" , "name": { "zh": "南京復興", "en": "Nanjing Fuxing" } },
	{"id":  65, "coordinates": [ 121.551530,25.051836 ], "code": "G17" , "name": { "zh": "台北小巨蛋", "en": "Taipei Arena" } },
	{"id":  66, "coordinates": [ 121.564708,25.051652 ], "code": "G18" , "name": { "zh": "南京三民", "en": "Nanjing Sanmin" } },
	{"id":  67, "coordinates": [ 121.578012,25.049283 ], "code": "G19" , "name": { "zh": "松山", "en": "Songshan" } },

	{"id":  68, "coordinates": [ 121.579338,24.998197 ], "code": "BR01", "name": { "zh": "動物園", "en": "Taipei Zoo" } },
	{"id":  69, "coordinates": [ 121.573145,24.998241 ], "code": "BR02", "name": { "zh": "木柵", "en": "Muzha" } },
	{"id":  70, "coordinates": [ 121.568102,24.998585 ], "code": "BR03", "name": { "zh": "萬芳社區", "en": "Wanfang Community" } },
	{"id":  71, "coordinates": [ 121.558152,24.999386 ], "code": "BR04", "name": { "zh": "萬芳醫院", "en": "Wanfang Hospital" } },
	{"id":  72, "coordinates": [ 121.557107,25.005475 ], "code": "BR05", "name": { "zh": "辛亥", "en": "Xinhai" } },
	{"id":  73, "coordinates": [ 121.558791,25.018535 ], "code": "BR06", "name": { "zh": "麟光", "en": "Linguang" } },
	{"id":  74, "coordinates": [ 121.553115,25.023777 ], "code": "BR07", "name": { "zh": "六張犁", "en": "Liuzhangli" } },
	{"id":  75, "coordinates": [ 121.543437,25.026125 ], "code": "BR08", "name": { "zh": "科技大樓", "en": "Technology Building" } },
	{"id":  76, "coordinates": [ 121.544227,25.060849 ], "code": "BR12", "name": { "zh": "中山國中", "en": "Zhongshan Junior High School" } },
	{"id":  77, "coordinates": [ 121.551996,25.063000 ], "code": "BR13", "name": { "zh": "松山機場", "en": "Songshan Airport" } },
	{"id":  78, "coordinates": [ 121.546895,25.079477 ], "code": "BR14", "name": { "zh": "大直", "en": "Dazhi" } },
	{"id":  79, "coordinates": [ 121.555592,25.084853 ], "code": "BR15", "name": { "zh": "劍南路", "en": "Jiannan Rd." } },
	{"id":  80, "coordinates": [ 121.567213,25.082133 ], "code": "BR16", "name": { "zh": "西湖", "en": "Xihu" } },
	{"id":  81, "coordinates": [ 121.575081,25.080028 ], "code": "BR17", "name": { "zh": "港墘", "en": "Gangqian" } },
	{"id":  82, "coordinates": [ 121.584761,25.078532 ], "code": "BR18", "name": { "zh": "文德", "en": "Wende" } },
	{"id":  83, "coordinates": [ 121.594408,25.083661 ], "code": "BR19", "name": { "zh": "內湖", "en": "Neihu" } },
	{"id":  84, "coordinates": [ 121.602141,25.083845 ], "code": "BR20", "name": { "zh": "大湖公園", "en": "Dahu Park" } },
	{"id":  85, "coordinates": [ 121.607158,25.072701 ], "code": "BR21", "name": { "zh": "葫洲", "en": "Huzhou" } },
	{"id":  86, "coordinates": [ 121.611445,25.067147 ], "code": "BR22", "name": { "zh": "東湖", "en": "Donghu" } },
	{"id":  87, "coordinates": [ 121.615953,25.059905 ], "code": "BR23", "name": { "zh": "南港軟體園區", "en": "Nangang Software Park" } },
	{"id":  88, "coordinates": [ 121.509237,24.990045 ], "code": "O01" , "name": { "zh": "南勢角", "en": "Nanshijiao" } },
	{"id":  89, "coordinates": [ 121.505113,24.993905 ], "code": "O02" , "name": { "zh": "景安", "en": "Jingan" } },
	{"id":  90, "coordinates": [ 121.511231,25.002876 ], "code": "O03" , "name": { "zh": "永安市場", "en": "Yongan Market" } },
	{"id":  91, "coordinates": [ 121.515485,25.013821 ], "code": "O04" , "name": { "zh": "頂溪", "en": "Dingxi" } },
	{"id":  92, "coordinates": [ 121.533185,25.059718 ], "code": "O09" , "name": { "zh": "行天宮", "en": "Xingtian Temple" } },
	{"id":  93, "coordinates": [ 121.526419,25.062694 ], "code": "O10" , "name": { "zh": "中山國小", "en": "Zhongshan Elementary School" } },
	{"id":  94, "coordinates": [ 121.512720,25.063256 ], "code": "O12" , "name": { "zh": "大橋頭", "en": "Daqiaotou" } },
	{"id":  95, "coordinates": [ 121.500762,25.063274 ], "code": "O13" , "name": { "zh": "台北橋", "en": "Taipei Bridge" } },
	{"id":  96, "coordinates": [ 121.492156,25.060274 ], "code": "O14" , "name": { "zh": "菜寮", "en": "Cailiao" } },
	{"id":  97, "coordinates": [ 121.484725,25.055791 ], "code": "O15" , "name": { "zh": "三重", "en": "Sanchong" } },
	{"id":  98, "coordinates": [ 121.471916,25.046493 ], "code": "O16" , "name": { "zh": "先嗇宮", "en": "Xianse Temple" } },
	{"id":  99, "coordinates": [ 121.461746,25.039705 ], "code": "O17" , "name": { "zh": "頭前庄", "en": "Touqianzhuang" } },
	{"id": 100, "coordinates": [ 121.452468,25.036125 ], "code": "O18" , "name": { "zh": "新莊", "en": "Xinzhuang" } },
	{"id": 101, "coordinates": [ 121.435470,25.032718 ], "code": "O19" , "name": { "zh": "輔大", "en": "Fu Jen University" } },
	{"id": 102, "coordinates": [ 121.422708,25.028867 ], "code": "O20" , "name": { "zh": "丹鳳", "en": "Danfeng" } },
	{"id": 103, "coordinates": [ 121.411270,25.021862 ], "code": "O21" , "name": { "zh": "迴龍", "en": "Huilong" } },
	{"id": 104, "coordinates": [ 121.496904,25.070319 ], "code": "O50" , "name": { "zh": "三重國小", "en": "Sanchong Elementary School" } },
	{"id": 105, "coordinates": [ 121.486347,25.076859 ], "code": "O51" , "name": { "zh": "三和國中", "en": "Sanhe Junior High School" } },
	{"id": 106, "coordinates": [ 121.479673,25.080728 ], "code": "O52" , "name": { "zh": "徐匯中學", "en": "St. Ignatius High School" } },
	{"id": 107, "coordinates": [ 121.473389,25.085456 ], "code": "O53" , "name": { "zh": "三民高中", "en": "Sanmin Senior High School" } },
	{"id": 108, "coordinates": [ 121.464471,25.091554 ], "code": "O54" , "name": { "zh": "蘆洲", "en": "Luzhou" } },
]