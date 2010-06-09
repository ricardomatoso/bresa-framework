//<![CDATA[
	/* Replacement calls. Please see documentation for more information. */

	if(typeof sIFR == "function"){

	// This is the preferred "named argument" syntax
	//sIFR.replaceElement(named({sSelector:"h2", sFlashSrc:"swf/TraditionSansXLight.swf", sColor:"#323232", sLinkColor:"#d2b21d", nPaddingTop:0, nPaddingBottom:0, sFlashVars:"textalign=left&offsetTop=0", sWmode:"transparent", sDisplay:"block"}));

	sIFR.replaceElement(named({sSelector:".search label,.title h2, h3.title", sFlashSrc:"swf/ozone.swf", sColor:"#323232", sLinkColor:"#3b723e", nPaddingTop:0, nPaddingBottom:0, sFlashVars:"textalign=left&offsetTop=0", sWmode:"transparent"}));
	sIFR.replaceElement(named({sSelector:".title span", sFlashSrc:"swf/ozone.swf", sColor:"#b30000", sLinkColor:"#3b723e", nPaddingTop:0, nPaddingBottom:0, sFlashVars:"textalign=left&offsetTop=0", sWmode:"transparent"}));

	};

	//]]>
	
	Cufon.replace('.convidarAmigos h3, .festas h3, .passos li, .legenda h4,.detalhesFesta .title h3, .colunasAmigos h5,.deixeMensagem h4', { fontFamily: 'Arial' });
	Cufon.replace('.content .box.rankingTop ul li span, .rankingLiga ul li span, table tbody td.colocacao', { fontFamily: 'Arial' });
