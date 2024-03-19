const fathers = [
	{
		filename: "JustinMartyr.json",
		title: "Justin Martyr",
	},
	{
		filename: "Irenaeus.json",
		title: "Irenaeus",
	},
	{
		filename: "ClementOfRome.json",
		title: "Clement of Rome",
	},
	{
		filename: "Mathetes.json",
		title: "Mathetes",
	},
	{
		filename: "Polycarp.json",
		title: "Polycarp",
	},
	{
		filename: "Ignatius.json",
		title: "Ignatius",
	},
	{
		filename: "Barnabas.json",
		title: "Barnabas",
	},
	{
		filename: "Papias.json",
		title: "Papias",
	},
	{
		filename: "JustinMartyr.json",
		title: "Justin Martyr",
	},
	{
		filename: "Irenaeus.json",
		title: "Irenaeus",
	},
	{
		filename: "Hermas.json",
		title: "Hermas",
	},
	{
		filename: "Tatian.json",
		title: "Tatian",
	},
	{
		filename: "Theophilus.json",
		title: "Theophilus",
	},
	{
		filename: "Athenagoras.json",
		title: "Athenagoras",
	},
	{
		filename: "ClementOfAlexandria.json",
		title: "Clement of Alexandria",
	},
	{
		filename: "Tertullian.json",
		title: "Tertullian",
	},
	{
		filename: "MinuciusFelix.json",
		title: "Minucius Felix",
	},
	{
		filename: "Commodian.json",
		title: "Commodian",
	},
	{
		filename: "Origen.json",
		title: "Origen",
	},
	{
		filename: "Hippolytus.json",
		title: "Hippolytus",
	},
	{
		filename: "Cyprian.json",
		title: "Cyprian",
	},
	{
		filename: "Caius.json",
		title: "Caius",
	},
	{
		filename: "Novatian.json",
		title: "Novatian",
	},
	{
		filename: "Appendix.json",
		title: "Appendix",
	},
	{
		filename: "GregoryThaumaturgus.json",
		title: "Gregory Thaumaturgus",
	},
	{
		filename: "DionysiusTheGreat.json",
		title: "Dionysius the Great",
	},
	{
		filename: "JuliusAfricanus.json",
		title: "Julius Africanus",
	},
	{
		filename: "AnatoliusAndMinorWriters.json",
		title: "Anatolius and Minor Writers",
	},
	{
		filename: "Methodius.json",
		title: "Methodius",
	},
	{
		filename: "Arnobius.json",
		title: "Arnobius",
	},
	{
		filename: "Lactantius.json",
		title: "Lactantius",
	},
	{
		filename: "Venantius.json",
		title: "Venantius",
	},
	{
		filename: "Asterius.json",
		title: "Asterius",
	},
	{
		filename: "Victorinus.json",
		title: "Victorinus",
	},
	{
		filename: "DionysiusOfRome.json",
		title: "Dionysius of Rome",
	},
	{
		filename: "ApostolicTeachingAndConstitutions.json",
		title: "Apostolic Teaching and Constitutions",
	},
	{
		filename: "Homily.json",
		title: "Homily",
	},
	{
		filename: "Liturgies.json",
		title: "Liturgies",
	},
	{
		filename: "TheTwelvePatriarchs.json",
		title: "The Twelve Patriarchs",
	},
	{
		filename: "ExcerptsAndEpistles.json",
		title: "Excerpts and Epistles",
	},
	{
		filename: "TheClementia.json",
		title: "The Clementia",
	},
	{
		filename: "Apocrypha.json",
		title: "Apocrypha",
	},
	{
		filename: "Decretals.json",
		title: "Decretals",
	},
	{
		filename: "MemoirsOfEdessaAndSyriacDocuments.json",
		title: "Memoirs of Edessa and Syriac Documents",
	},
	{
		filename: "RemainsOfTheFirstAges.json",
		title: "Remains of the First Ages",
	},
	{
		filename: "TheGospelOfPeter.json",
		title: "The Gospel of Peter",
	},
	{
		filename: "TheDiatessaronOfTatian.json",
		title: "The Diatessaron of Tatian",
	},
	{
		filename: "TheApocalypseOfPeter.json",
		title: "The Apocalypse of Peter",
	},
	{
		filename: "TheVisioPauli.json",
		title: "The Visio Pauli",
	},
	{
		filename: "TheApocalypsesOfTheVirginAndSedrach.json",
		title: "The Apocalypses of the Virgin and Sedrach",
	},
	{
		filename: "TheTestamentOfAbraham.json",
		title: "The Testament of Abraham",
	},
	{
		filename: "TheActsOfXanthippeAndPolyxena.json",
		title: "The Acts of Xanthippe and Polyxena",
	},
	{
		filename: "TheNarrativeOfZosimus.json",
		title: "The Narrative of Zosimus",
	},
	{
		filename: "TheApologyOfAristides.json",
		title: "The Apology of Aristides",
	},
	{
		filename: "AugustineOfHippo.json",
		title: "Augustine of Hippo",
	},
	{
		filename: "JohnChrysostom.json",
		title: "John Chrysostom",
	},
	{
		filename: "Eusebius.json",
		title: "Eusebius",
	},
	{
		filename: "SocratesScholasticus.json",
		title: "Socrates Scholasticus",
	},
	{
		filename: "Theodoret.json",
		title: "Theodoret",
	},
	{
		filename: "Gennadius.json",
		title: "Gennadius",
	},
	{
		filename: "Rufinus.json",
		title: "Rufinus",
	},
	{
		filename: "Athanasius.json",
		title: "Athanasius",
	},
	{
		filename: "GregoryOfNyssa.json",
		title: "Gregory of Nyssa",
	},
	{
		filename: "Jerome.json",
		title: "Jerome",
	},
	{
		filename: "CyrilOfJerusalem.json",
		title: "Cyril of Jerusalem",
	},
	{
		filename: "GregoryNazianzen.json",
		title: "Gregory Nazianzen",
	},
	{
		filename: "Basil.json",
		title: "Basil",
	},
	{
		filename: "HilaryOfPoitiers.json",
		title: "Hilary of Poitiers",
	},
	{
		filename: "JohnOfDamascus.json",
		title: "John of Damascus",
	},
	{
		filename: "Ambrose.json",
		title: "Ambrose",
	},
	{
		filename: "SulpitiusSeverus.json",
		title: "Sulpitius Severus",
	},
	{
		filename: "VincentOfLerins.json",
		title: "Vincent of Lerins",
	},
	{
		filename: "JohnCassian.json",
		title: "John Cassian",
	},
	{
		filename: "LeoTheGreat.json",
		title: "Leo the Great",
	},
	{
		filename: "GregoryTheGreat.json",
		title: "Gregory the Great",
	},
	{
		filename: "GregoryTheGreat2.json",
		title: "Gregory the Great II",
	},
	{
		filename: "EphriamSyrus.json",
		title: "Ephriam Syrus",
	},
	{
		filename: "Aphrahat.json",
		title: "Aphrahat",
	},
];
