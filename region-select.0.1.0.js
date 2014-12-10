// RegionSelect
// ------------
// v0.1.0
//
// Copyright (c)2014 SmartData
// Distributed under MIT license
//
// https://github.com/mysmartdata/js-region-select

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['regionSelect'], function(regionSelect) {
            return (root.RegionSelect = factory(root));
        });
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(root);
    } else {
        root.RegionSelect = factory(root);
    }
}(this, function(root) {
    'use strict';

    var RegionSelect = function (options) {
        var defaults = {
            language: 'en',
            elementId: null,
            elementAttributes: {}
        };

        if (typeof options === 'object') {
            for(var key in options) {
                if(options.hasOwnProperty(key)) {
                    defaults[key] = options[key];
                }
            }
        }

        this._options = defaults;
        this._countrySelectElement = null;
        this._currentValue = '';

        if (this._options.elementId !== null) {
            this._element = document.getElementById(this._options.elementId);
            if (this._element) {
                this._initElement(this._element);
                if (this._countrySelectElement) {
                    this._init();
                }
            }
        }
    };

    RegionSelect.prototype._regionCollection = [{"names":{"en":"Alabama","fr":"Alabama","de":"Alabama"},"code":"AL","long_code":"US-AL","country":"US","type":"State","timezone":"America\/Chicago","bounding_box":{"nortWestCorner":{"latitude":"35.0081121","longitude":"-88.4731354"},"southEastCorner":{"latitude":"30.1375221","longitude":"-84.8882459"}},"latitude":"33.2588817","longitude":"-86.8295337"},{"names":{"en":"Alaska","fr":"Alaska","de":"Alaska"},"code":"AK","long_code":"US-AK","country":"US","type":"State","timezone":null,"bounding_box":{"nortWestCorner":{"latitude":"71.6048217","longitude":"-179.9999999"},"southEastCorner":{"latitude":"51.0228712","longitude":"180"}},"latitude":"64.4459613","longitude":"-149.680909"},{"names":{"en":"Arizona","fr":"Arizona","de":"Arizona"},"code":"AZ","long_code":"US-AZ","country":"US","type":"State","timezone":null,"bounding_box":{"nortWestCorner":{"latitude":"37.00426","longitude":"-114.8183583"},"southEastCorner":{"latitude":"31.332177","longitude":"-109.0452"}},"latitude":"34.395342","longitude":"-111.7632755"},{"names":{"en":"Arkansas","fr":"Arkansas","de":"Arkansas"},"code":"AR","long_code":"US-AR","country":"US","type":"State","timezone":"America\/Chicago","bounding_box":{"nortWestCorner":{"latitude":"36.4996","longitude":"-94.617812"},"southEastCorner":{"latitude":"33.004106","longitude":"-89.6422485"}},"latitude":"35.2048883","longitude":"-92.4479108"},{"names":{"en":"California","fr":"Californie","de":"Kalifornien"},"code":"CA","long_code":"US-CA","country":"US","type":"State","timezone":"America\/Los_Angeles","bounding_box":{"nortWestCorner":{"latitude":"42.009499","longitude":"-124.4820029"},"southEastCorner":{"latitude":"32.5295236","longitude":"-114.1307815"}},"latitude":"36.7014631","longitude":"-118.7559974"},{"names":{"en":"Colorado","fr":"Colorado","de":"Colorado"},"code":"CO","long_code":"US-CO","country":"US","type":"State","timezone":null,"bounding_box":{"nortWestCorner":{"latitude":"41.00236","longitude":"-109.060256"},"southEastCorner":{"latitude":"36.992426","longitude":"-102.0415849"}},"latitude":"38.7251776","longitude":"-105.6077167"},{"names":{"en":"Connecticut","fr":"Connecticut","de":"Connecticut"},"code":"CT","long_code":"US-CT","country":"US","type":"State","timezone":"America\/New_York","bounding_box":{"nortWestCorner":{"latitude":"42.050587","longitude":"-73.7277749"},"southEastCorner":{"latitude":"40.9508815","longitude":"-71.7869939"}},"latitude":"41.6500201","longitude":"-72.7342163"},{"names":{"en":"Delaware","fr":"Delaware","de":"Delaware"},"code":"DE","long_code":"US-DE","country":"US","type":"State","timezone":"America\/New_York","bounding_box":{"nortWestCorner":{"latitude":"39.839433","longitude":"-75.7890402"},"southEastCorner":{"latitude":"38.4511276","longitude":"-74.9849354"}},"latitude":"38.6920451","longitude":"-75.4013315"},{"names":{"en":"Florida","fr":"Floride","de":"Florida"},"code":"FL","long_code":"US-FL","country":"US","type":"State","timezone":null,"bounding_box":{"nortWestCorner":{"latitude":"31.000968","longitude":"-87.6348959"},"southEastCorner":{"latitude":"24.396308","longitude":"-79.9743059"}},"latitude":"27.7567667","longitude":"-81.4639835"},{"names":{"en":"Georgia","fr":"G\u00e9orgie","de":"Georgien"},"code":"GA","long_code":null,"country":"US","type":"State","timezone":"Asia\/Tbilisi","bounding_box":{"nortWestCorner":{"latitude":"43.5864294","longitude":"39.8844803"},"southEastCorner":{"latitude":"41.0552922","longitude":"46.7365373"}},"latitude":"41.6809707","longitude":"44.0287382"},{"names":{"en":"Hawaii","fr":"Hawa\u00ef","de":"Hawaii"},"code":"HI","long_code":"US-HI","country":"US","type":"State","timezone":"Pacific\/Honolulu","bounding_box":{"nortWestCorner":{"latitude":"28.517269","longitude":"-178.4435929"},"southEastCorner":{"latitude":"18.864031","longitude":"-154.757659"}},"latitude":"21.2160437","longitude":"-157.975203"},{"names":{"en":"Idaho","fr":"Idaho","de":"Idaho"},"code":"ID","long_code":null,"country":"US","type":"State","timezone":null,"bounding_box":{"nortWestCorner":{"latitude":"49.0008447","longitude":"-117.2430269"},"southEastCorner":{"latitude":"41.988057","longitude":"-111.0435639"}},"latitude":"43.6447642","longitude":"-114.0154071"},{"names":{"en":"Illinois","fr":"Illinois","de":"Illinois"},"code":"IL","long_code":"US-IL","country":"US","type":"State","timezone":"America\/Chicago","bounding_box":{"nortWestCorner":{"latitude":"42.508302","longitude":"-91.5130517"},"southEastCorner":{"latitude":"36.9701313","longitude":"-87.0199243"}},"latitude":"40.0796319","longitude":"-89.4339809"},{"names":{"en":"Indiana","fr":"Indiana","de":"Indiana"},"code":"IN","long_code":"US-IN","country":"US","type":"State","timezone":null,"bounding_box":{"nortWestCorner":{"latitude":"41.761368","longitude":"-88.0997018"},"southEastCorner":{"latitude":"37.771742","longitude":"-84.7829822"}},"latitude":"40.3270127","longitude":"-86.1746933"},{"names":{"en":"Iowa","fr":"Iowa","de":"Iowa"},"code":"IA","long_code":"US-IA","country":"US","type":"State","timezone":"America\/Chicago","bounding_box":{"nortWestCorner":{"latitude":"43.5011333","longitude":"-96.6397161"},"southEastCorner":{"latitude":"40.3756007","longitude":"-90.1400609"}},"latitude":"41.9216734","longitude":"-93.3122705"},{"names":{"en":"Kansas","fr":"Kansas","de":"Kansas"},"code":"KS","long_code":"US-KS","country":"US","type":"State","timezone":null,"bounding_box":{"nortWestCorner":{"latitude":"40.003095","longitude":"-102.0517562"},"southEastCorner":{"latitude":"36.993083","longitude":"-94.5882048"}},"latitude":"38.27312","longitude":"-98.5821872"},{"names":{"en":"Kentucky","fr":"Kentucky","de":"Kentucky"},"code":"KY","long_code":"US-KY","country":"US","type":"State","timezone":null,"bounding_box":{"nortWestCorner":{"latitude":"39.1477997","longitude":"-89.5715089"},"southEastCorner":{"latitude":"36.496719","longitude":"-81.9645412"}},"latitude":"37.5726028","longitude":"-85.1551411"},{"names":{"en":"Louisiana","fr":"Louisiane","de":"Louisiana"},"code":"LA","long_code":"US-LA","country":"US","type":"State","timezone":"America\/Chicago","bounding_box":{"nortWestCorner":{"latitude":"33.0194557","longitude":"-94.0431469"},"southEastCorner":{"latitude":"28.855127","longitude":"-88.7583879"}},"latitude":"30.8703881","longitude":"-92.007126"},{"names":{"en":"Maine","fr":"Maine","de":"Maine"},"code":"ME","long_code":"US-ME","country":"US","type":"State","timezone":"America\/New_York","bounding_box":{"nortWestCorner":{"latitude":"47.4598397","longitude":"-71.0841693"},"southEastCorner":{"latitude":"42.9222206","longitude":"-66.8854161"}},"latitude":"45.709097","longitude":"-68.8590201"},{"names":{"en":"Maryland","fr":"Maryland","de":"Maryland"},"code":"MD","long_code":"US-MD","country":"US","type":"State","timezone":"America\/New_York","bounding_box":{"nortWestCorner":{"latitude":"39.7229331","longitude":"-79.4871911"},"southEastCorner":{"latitude":"37.8856427","longitude":"-74.9851722"}},"latitude":"39.5162234","longitude":"-76.9382069"},{"names":{"en":"Michigan","fr":"Michigan","de":"Michigan"},"code":"MI","long_code":"US-MI","country":"US","type":"State","timezone":"America\/Detroit","bounding_box":{"nortWestCorner":{"latitude":"48.306063","longitude":"-90.4186201"},"southEastCorner":{"latitude":"41.696089","longitude":"-82.1228055"}},"latitude":"43.6211955","longitude":"-84.6824346"},{"names":{"en":"Minnesota","fr":"Minnesota","de":"Minnesota"},"code":"MN","long_code":"US-MN","country":"US","type":"State","timezone":"America\/Chicago","bounding_box":{"nortWestCorner":{"latitude":"49.3844901","longitude":"-97.2392618"},"southEastCorner":{"latitude":"43.4994288","longitude":"-89.4833849"}},"latitude":"45.9896587","longitude":"-94.6113288"},{"names":{"en":"Mississippi","fr":"Mississippi","de":"Mississippi"},"code":"MS","long_code":"US-MS","country":"US","type":"State","timezone":"America\/Chicago","bounding_box":{"nortWestCorner":{"latitude":"34.996052","longitude":"-91.6550089"},"southEastCorner":{"latitude":"30.1477908","longitude":"-88.0976405"}},"latitude":"32.9715645","longitude":"-89.7348497"},{"names":{"en":"Missouri","fr":"Missouri","de":"Missouri"},"code":"MO","long_code":"US-MO","country":"US","type":"State","timezone":"America\/Chicago","bounding_box":{"nortWestCorner":{"latitude":"40.6136347","longitude":"-95.774144"},"southEastCorner":{"latitude":"35.995683","longitude":"-89.0988429"}},"latitude":"38.7604815","longitude":"-92.5617875"},{"names":{"en":"Montana","fr":"Montana","de":"Montana"},"code":"MT","long_code":"US-MT","country":"US","type":"State","timezone":null,"bounding_box":{"nortWestCorner":{"latitude":"49.0011094","longitude":"-116.0500029"},"southEastCorner":{"latitude":"44.358221","longitude":"-104.0395629"}},"latitude":"47.3752671","longitude":"-109.6387579"},{"names":{"en":"Nebraska","fr":"Nebraska","de":"Nebraska"},"code":"NE","long_code":"US-NE","country":"US","type":"State","timezone":null,"bounding_box":{"nortWestCorner":{"latitude":"43.0016999","longitude":"-104.0535139"},"southEastCorner":{"latitude":"39.9999986","longitude":"-95.3080544"}},"latitude":"41.7370229","longitude":"-99.5873816"},{"names":{"en":"Nevada","fr":"Nevada","de":"Nevada"},"code":"NV","long_code":"US-NV","country":"US","type":"State","timezone":"America\/Los_Angeles","bounding_box":{"nortWestCorner":{"latitude":"42.002207","longitude":"-120.0057275"},"southEastCorner":{"latitude":"35.0018757","longitude":"-114.0396479"}},"latitude":"39.5158825","longitude":"-116.8537227"},{"names":{"en":"New Hampshire","fr":"New Hampshire","de":"New Hampshire"},"code":"NH","long_code":"US-NH","country":"US","type":"State","timezone":"America\/New_York","bounding_box":{"nortWestCorner":{"latitude":"45.3057789","longitude":"-72.5571232"},"southEastCorner":{"latitude":"42.6970417","longitude":"-70.5613592"}},"latitude":"43.4849133","longitude":"-71.6553992"},{"names":{"en":"New Jersey","fr":"New Jersey","de":"New Jersey"},"code":"NJ","long_code":"US-NJ","country":"US","type":"State","timezone":"America\/New_York","bounding_box":{"nortWestCorner":{"latitude":"41.357423","longitude":"-75.5633859"},"southEastCorner":{"latitude":"38.7911303","longitude":"-73.8939789"}},"latitude":"40.0757384","longitude":"-74.4041622"},{"names":{"en":"New Mexico","fr":"Nouveau-Mexique","de":"Neumexiko"},"code":"NM","long_code":"US-NM","country":"US","type":"State","timezone":null,"bounding_box":{"nortWestCorner":{"latitude":"37.000139","longitude":"-109.0501729"},"southEastCorner":{"latitude":"31.332301","longitude":"-103.0008688"}},"latitude":"34.5708167","longitude":"-105.993007"},{"names":{"en":"New York","fr":"New York","de":"New York"},"code":"NY","long_code":"US-NY","country":"US","type":"State","timezone":"America\/New_York","bounding_box":{"nortWestCorner":{"latitude":"45.0158611","longitude":"-79.76251"},"southEastCorner":{"latitude":"40.477399","longitude":"-71.7897328"}},"latitude":"43.1561681","longitude":"-75.8449946"},{"names":{"en":"North Carolina","fr":"Caroline du Nord","de":"Nord-Carolina"},"code":"NC","long_code":"US-NC","country":"US","type":"State","timezone":"America\/New_York","bounding_box":{"nortWestCorner":{"latitude":"36.5880363","longitude":"-84.3218689"},"southEastCorner":{"latitude":"33.752878","longitude":"-75.4001189"}},"latitude":"35.6729639","longitude":"-79.0392919"},{"names":{"en":"North Dakota","fr":"Dakota du Nord","de":"Nord-Dakota"},"code":"ND","long_code":"US-ND","country":"US","type":"State","timezone":null,"bounding_box":{"nortWestCorner":{"latitude":"49.0004918","longitude":"-104.0492649"},"southEastCorner":{"latitude":"45.9350359","longitude":"-96.5543974"}},"latitude":"47.6201461","longitude":"-100.540737"},{"names":{"en":"Ohio","fr":"Ohio","de":"Ohio"},"code":"OH","long_code":"US-OH","country":"US","type":"State","timezone":"America\/New_York","bounding_box":{"nortWestCorner":{"latitude":"42.3232365","longitude":"-84.8203367"},"southEastCorner":{"latitude":"38.403202","longitude":"-80.5189909"}},"latitude":"40.2253569","longitude":"-82.6881395"},{"names":{"en":"Oklahoma","fr":"Oklahoma","de":"Oklahoma"},"code":"OK","long_code":"US-OK","country":"US","type":"State","timezone":null,"bounding_box":{"nortWestCorner":{"latitude":"37.002133","longitude":"-103.0025649"},"southEastCorner":{"latitude":"33.6191955","longitude":"-94.4312149"}},"latitude":"34.9550817","longitude":"-97.2684063"},{"names":{"en":"Oregon","fr":"Oregon","de":"Oregon"},"code":"OR","long_code":"US-OR","country":"US","type":"State","timezone":null,"bounding_box":{"nortWestCorner":{"latitude":"46.299099","longitude":"-124.7035409"},"southEastCorner":{"latitude":"41.991794","longitude":"-116.4635039"}},"latitude":"43.9792797","longitude":"-120.737257"},{"names":{"en":"Pennsylvania","fr":"Pennsylvanie","de":"Pennsylvanien"},"code":"PA","long_code":"US-PA","country":"US","type":"State","timezone":"America\/New_York","bounding_box":{"nortWestCorner":{"latitude":"42.5146891","longitude":"-80.5210832"},"southEastCorner":{"latitude":"39.7197662","longitude":"-74.6895019"}},"latitude":"40.9699889","longitude":"-77.7278831"},{"names":{"en":"Rhode Island","fr":"Rhode Island","de":"Rhode Island"},"code":"RI","long_code":"US-RI","country":"US","type":"State","timezone":"America\/New_York","bounding_box":{"nortWestCorner":{"latitude":"42.0188529","longitude":"-71.9074126"},"southEastCorner":{"latitude":"41.0959868","longitude":"-71.0999606"}},"latitude":"41.7962409","longitude":"-71.5992372"},{"names":{"en":"South Carolina","fr":"Caroline du Sud","de":"S\u00fcd-Carolina"},"code":"SC","long_code":"US-SC","country":"US","type":"State","timezone":"America\/New_York","bounding_box":{"nortWestCorner":{"latitude":"35.21554","longitude":"-83.3539978"},"southEastCorner":{"latitude":"32.0333126","longitude":"-78.4993009"}},"latitude":"33.6874388","longitude":"-80.4363743"},{"names":{"en":"South Dakota","fr":"Dakota du Sud","de":"S\u00fcd-Dakota"},"code":"SD","long_code":"US-SD","country":"US","type":"State","timezone":null,"bounding_box":{"nortWestCorner":{"latitude":"45.94545","longitude":"-104.0576979"},"southEastCorner":{"latitude":"42.4798925","longitude":"-96.4363402"}},"latitude":"44.6471761","longitude":"-100.348761"},{"names":{"en":"Tennessee","fr":"Tennessee","de":"Tennessee"},"code":"TN","long_code":"US-TN","country":"US","type":"State","timezone":"America\/Chicago","bounding_box":{"nortWestCorner":{"latitude":"36.678118","longitude":"-90.3102979"},"southEastCorner":{"latitude":"34.9829822","longitude":"-81.6468999"}},"latitude":"35.7730076","longitude":"-86.2820081"},{"names":{"en":"Texas","fr":"Texas","de":"Texas"},"code":"TX","long_code":"US-TX","country":"US","type":"State","timezone":null,"bounding_box":{"nortWestCorner":{"latitude":"36.500704","longitude":"-106.6456459"},"southEastCorner":{"latitude":"25.83706","longitude":"-93.5078216"}},"latitude":"31.8160381","longitude":"-99.5120986"},{"names":{"en":"Utah","fr":"Utah","de":"Utah"},"code":"UT","long_code":"US-UT","country":"US","type":"State","timezone":null,"bounding_box":{"nortWestCorner":{"latitude":"42.0013862","longitude":"-114.0539319"},"southEastCorner":{"latitude":"36.997968","longitude":"-109.0410727"}},"latitude":"39.4225192","longitude":"-111.7143584"},{"names":{"en":"Vermont","fr":"Vermont","de":"Vermont"},"code":"VT","long_code":"US-VT","country":"US","type":"State","timezone":"America\/New_York","bounding_box":{"nortWestCorner":{"latitude":"45.016665","longitude":"-73.4377399"},"southEastCorner":{"latitude":"42.7269329","longitude":"-71.4653566"}},"latitude":"44.5990718","longitude":"-72.5002608"},{"names":{"en":"Virginia","fr":"Virginie","de":"Virginia"},"code":"VA","long_code":"US-VA","country":"US","type":"State","timezone":"America\/New_York","bounding_box":{"nortWestCorner":{"latitude":"39.466012","longitude":"-83.6754129"},"southEastCorner":{"latitude":"36.5407896","longitude":"-75.2312244"}},"latitude":"37.1232245","longitude":"-78.4927721"},{"names":{"en":"Washington","fr":"Washington","de":"Washington"},"code":"WA","long_code":"US-WA","country":"US","type":"State","timezone":null,"bounding_box":{"nortWestCorner":{"latitude":"49.0024392","longitude":"-124.8360915"},"southEastCorner":{"latitude":"45.5437226","longitude":"-116.9174297"}},"latitude":"47.2868352","longitude":"-120.2126139"},{"names":{"en":"West Virginia","fr":"Virginie-Occidentale","de":"West Virginia"},"code":"WV","long_code":"US-WV","country":"US","type":"State","timezone":"America\/New_York","bounding_box":{"nortWestCorner":{"latitude":"40.638801","longitude":"-82.6447389"},"southEastCorner":{"latitude":"37.201483","longitude":"-77.7190289"}},"latitude":"38.4758406","longitude":"-80.8408415"},{"names":{"en":"Wisconsin","fr":"Wisconsin","de":"Wisconsin"},"code":"WI","long_code":"US-WI","country":"US","type":"State","timezone":"America\/Chicago","bounding_box":{"nortWestCorner":{"latitude":"47.3025","longitude":"-92.8881139"},"southEastCorner":{"latitude":"42.4919436","longitude":"-86.2495479"}},"latitude":"44.4308975","longitude":"-89.6884637"},{"names":{"en":"Wyoming","fr":"Wyoming","de":"Wyoming"},"code":"WY","long_code":"US-WY","country":"US","type":"State","timezone":null,"bounding_box":{"nortWestCorner":{"latitude":"45.0034186","longitude":"-111.0553309"},"southEastCorner":{"latitude":"40.994879","longitude":"-104.0521599"}},"latitude":"43.1700264","longitude":"-107.5685348"},{"names":{"en":"Washington, D.C.","fr":"Washington, D.C.","de":"Washington, D.C."},"code":"DC","long_code":null,"country":"US","type":"Federal District","timezone":"America\/New_York","bounding_box":{"nortWestCorner":{"latitude":"38.9958425","longitude":"-77.1197662"},"southEastCorner":{"latitude":"38.7916303","longitude":"-76.9091713"}},"latitude":"38.8937154","longitude":"-76.9877934586326"},{"names":{"en":"American Samoa","fr":"Samoa am\u00e9ricaines","de":"American Samoa"},"code":"AS","long_code":"US-AS","country":"US","type":"Territory","timezone":null,"bounding_box":{"nortWestCorner":{"latitude":"-10.8449745","longitude":"-171.2951295"},"southEastCorner":{"latitude":"-14.7608357","longitude":"-167.9322898"}},"latitude":"-14.30063085","longitude":"-170.695974691655"},{"names":{"en":"Guam","fr":"Guam","de":"Guam"},"code":"GU","long_code":"US-GU","country":"US","type":"Territory","timezone":"Pacific\/Guam","bounding_box":{"nortWestCorner":{"latitude":"13.706179","longitude":"144.563426"},"southEastCorner":{"latitude":"13.182335","longitude":"145.009167"}},"latitude":"13.444138","longitude":"144.733626445767"},{"names":{"en":"Northern Mariana Islands","fr":"Northern Mariana Islands","de":"Northern Mariana Islands"},"code":"MP","long_code":"US-MP","country":"US","type":"Territory","timezone":"Pacific\/Saipan","bounding_box":{"nortWestCorner":{"latitude":"20.616556","longitude":"144.813338"},"southEastCorner":{"latitude":"14.036565","longitude":"146.154418"}},"latitude":"14.1490205","longitude":"145.213452483189"},{"names":{"en":"Puerto Rico","fr":"Puerto Rico","de":"Puerto Rico"},"code":"PR","long_code":"US-PR","country":"US","type":"Territory","timezone":"America\/Puerto_Rico","bounding_box":{"nortWestCorner":{"latitude":"18.568002","longitude":"-67.9987509"},"southEastCorner":{"latitude":"17.831509","longitude":"-65.1685029"}},"latitude":"18.2017809","longitude":"-66.5841246"},{"names":{"en":"United States Virgin Islands","fr":"\u00celes Vierges des \u00c9tats-Unis","de":"Amerikanische Jungferninseln"},"code":"VI","long_code":"US-VI","country":"US","type":"Territory","timezone":"America\/St_Thomas","bounding_box":{"nortWestCorner":{"latitude":"18.464984","longitude":"-65.1590939"},"southEastCorner":{"latitude":"17.623468","longitude":"-64.5126739"}},"latitude":"17.789187","longitude":"-64.7080574"},{"names":{"en":"Ontario","fr":"Ontario","de":"Ontario"},"code":"ON","long_code":"CA-ON","country":"CA","type":"Province","timezone":"America\/Toronto","bounding_box":{"nortWestCorner":{"latitude":"56.8593635","longitude":"-95.1537398"},"southEastCorner":{"latitude":"41.6765556","longitude":"-74.3201061"}},"latitude":"50.0000002","longitude":"-86.0000001"},{"names":{"en":"Quebec","fr":"Qu\u00e9bec","de":"Quebec"},"code":"QC","long_code":"CA-QC","country":"CA","type":"Province","timezone":null,"bounding_box":{"nortWestCorner":{"latitude":"62.5804863","longitude":"-79.7741349"},"southEastCorner":{"latitude":"44.9913689","longitude":"-57.1054863"}},"latitude":"54","longitude":"-72"},{"names":{"en":"Nova Scotia","fr":"Nouvelle-\u00c9cosse","de":"Neuschottland"},"code":"NS","long_code":"CA-NS","country":"CA","type":"Province","timezone":"America\/Halifax","bounding_box":{"nortWestCorner":{"latitude":"47.2350807","longitude":"-66.4470814"},"southEastCorner":{"latitude":"43.2517424","longitude":"-59.6188299"}},"latitude":"45.0000002","longitude":"-62.9999999"},{"names":{"en":"New Brunswick","fr":"Nouveau-Brunswick","de":"Neubraunschweig"},"code":"NB","long_code":"CA-NB","country":"CA","type":"Province","timezone":"America\/Moncton","bounding_box":{"nortWestCorner":{"latitude":"48.0893391","longitude":"-69.0534662"},"southEastCorner":{"latitude":"44.5561189","longitude":"-63.6147115"}},"latitude":"46.5","longitude":"-66.75"},{"names":{"en":"Manitoba","fr":"Manitoba","de":"Manitoba"},"code":"MB","long_code":"CA-MB","country":"CA","type":"Province","timezone":"America\/Winnipeg","bounding_box":{"nortWestCorner":{"latitude":"59.99926","longitude":"-102.0076114"},"southEastCorner":{"latitude":"48.9989765","longitude":"-88.990814"}},"latitude":"55.0000001","longitude":"-97.0000001"},{"names":{"en":"British Columbia","fr":"Colombie-Britannique","de":"Britisch-Kolumbien"},"code":"BC","long_code":"CA-BC","country":"CA","type":"Province","timezone":null,"bounding_box":{"nortWestCorner":{"latitude":"60.0023","longitude":"-139.0536705"},"southEastCorner":{"latitude":"48.2245556","longitude":"-114.0538223"}},"latitude":"55","longitude":"-125"},{"names":{"en":"Prince Edward Island","fr":"\u00cele-du-Prince-\u00c9douard","de":"Prinz-Edward-Insel"},"code":"PE","long_code":"CA-PE","country":"CA","type":"Province","timezone":"America\/Halifax","bounding_box":{"nortWestCorner":{"latitude":"47.0659678","longitude":"-64.446016"},"southEastCorner":{"latitude":"45.8580234","longitude":"-61.9865302"}},"latitude":"46.3202067","longitude":"-63.45941"},{"names":{"en":"Saskatchewan","fr":"Saskatchewan","de":"Saskatchewan"},"code":"SK","long_code":"CA-SK","country":"CA","type":"Province","timezone":null,"bounding_box":{"nortWestCorner":{"latitude":"59.99982","longitude":"-110.0063651"},"southEastCorner":{"latitude":"48.9988056","longitude":"-101.3619075"}},"latitude":"54","longitude":"-106"},{"names":{"en":"Alberta","fr":"Alberta","de":"Alberta"},"code":"AB","long_code":"CA-AB","country":"CA","type":"Province","timezone":"America\/Edmonton","bounding_box":{"nortWestCorner":{"latitude":"60.0004216","longitude":"-120.0013834"},"southEastCorner":{"latitude":"48.9966667","longitude":"-110.0047638"}},"latitude":"55","longitude":"-114.9999999"},{"names":{"en":"Newfoundland and Labrador","fr":"Terre-Neuve et Labrador","de":"Newfoundland and Labrador"},"code":"NL","long_code":"CA-NL","country":"CA","type":"Province","timezone":null,"bounding_box":{"nortWestCorner":{"latitude":"60.377744","longitude":"-67.8216851"},"southEastCorner":{"latitude":"46.6148345","longitude":"-52.6177919"}},"latitude":"52.0000002","longitude":"-56.0000001"},{"names":{"en":"Northwest Territories","fr":"Northwest Territories","de":"Northwest Territories"},"code":"NT","long_code":"CA-NT","country":"CA","type":"Territory","timezone":null,"bounding_box":{"nortWestCorner":{"latitude":"79.1299817","longitude":"-136.5880009"},"southEastCorner":{"latitude":"59.99812","longitude":"-102.0004756"}},"latitude":"65.0000004","longitude":"-118"},{"names":{"en":"Yukon","fr":"Yukon","de":"Yukon"},"code":"YT","long_code":"CA-YT","country":"CA","type":"Territory","timezone":"America\/Whitehorse","bounding_box":{"nortWestCorner":{"latitude":"69.84588","longitude":"-141.0027499"},"southEastCorner":{"latitude":"59.9948369","longitude":"-123.8114709"}},"latitude":"63.0000001","longitude":"-136.0000001"},{"names":{"en":"Nunavut","fr":"Nunavut","de":"Nunavut"},"code":"NU","long_code":"CA-NU","country":"CA","type":"Territory","timezone":null,"bounding_box":{"nortWestCorner":{"latitude":"83.3362128","longitude":"-120.6830208"},"southEastCorner":{"latitude":"51.1566468","longitude":"-59.6136766"}},"latitude":"70.0000073","longitude":"-90"}];
    RegionSelect.prototype._selectTemplate = "<select id=\"%id%\"%attributes%>%options%</select>";
    RegionSelect.prototype._optionTemplate = "<option value=\"%value%\">%name%</option>";
    RegionSelect.prototype._inputTemplate = "<input id=\"%id%\"%attributes% value=\"%value%\">";

    RegionSelect.prototype._initElement = function (element) {
        var allowedAttributes = ['name'];
        var attributes = element.attributes;
        var attributeName = '';
        for (var i = 0, len = attributes.length; i < len; ++i) {
            if (attributes[i].nodeName === "data-country-select-id") {
                this._countrySelectElement = document.getElementById(attributes[i].value);
            } else if (attributes[i].nodeName === "data-lang") {
                this._options['language'] = attributes[i].value;
            } else {
                if (attributes[i].nodeName.indexOf("data-") === 0) {
                    attributeName = attributes[i].nodeName.substring(5);
                    if (allowedAttributes.indexOf(attributeName) !== -1) {
                        this._options.elementAttributes[attributeName] = attributes[i].value;
                    }
                }
            }
        }
    };

    RegionSelect.prototype._init = function () {
        this._bindCountryEvents();
        this._showRegions(this._countrySelectElement.value);
    };

    RegionSelect.prototype._bindCountryEvents = function () {
        var root = this;
        this._countrySelectElement.addEventListener("change", function (event) {
            root._onCountrySelectChange(event);
        });
    };

    RegionSelect.prototype._bindElementEvents = function () {
        var root = this;
        this._element.addEventListener("change", function (event) {
            root._onElementValueChange(event);
        });
    };

    RegionSelect.prototype._onCountrySelectChange = function (event) {
        this._showRegions(event.currentTarget.value);
    };

    RegionSelect.prototype._onElementValueChange = function (event) {
        if (event.currentTarget.nodeName == 'INPUT') {
            this._currentValue = event.currentTarget.value;
        } else {
            this._currentValue = '';
        }
    };

    RegionSelect.prototype._swapElement = function (newElementString) {
        var newElement = document.createElement('div');
        newElement.innerHTML = newElementString;
        newElement = newElement.firstChild;
        this._element.parentNode.insertBefore(newElement, this._element);
        this._element.parentNode.removeChild(this._element);
        this._element = newElement;
        this._bindElementEvents();
    };

    RegionSelect.prototype._showRegions = function (country) {
        if (country === 'CA') {
            this._showCaRegions();
        } else if (country === 'US') {
            this._showUsRegions();
        } else {
            this._showRegionInput();
        }
    };

    RegionSelect.prototype._showCaRegions = function () {
        var element = this._renderSelect(
            this._getOrderedRegionsForCountry('CA')
        );
        this._swapElement(element);
    };

    RegionSelect.prototype._showUsRegions = function () {
        var element = this._renderSelect(
            this._getOrderedRegionsForCountry('US')
        );
        this._swapElement(element);
    };

    RegionSelect.prototype._showRegionInput = function () {
        var element = this._render(this._inputTemplate, {
            id: this._options.elementId,
            attributes: this._options.elementAttributes,
            value: this._currentValue
        });
        this._swapElement(element);
    };

    RegionSelect.prototype._renderSelect = function (regions) {
        var options = '';
        var model;
        for (var i = 0, len = regions.length; i < len; ++i) {
            model = regions[i];
            options = options + this._render(this._optionTemplate, {
                value: model.code,
                name: model.names[this._options['language']]
            });
        }

        return this._render(this._selectTemplate, {
            id: this._options.elementId,
            attributes: this._options.elementAttributes,
            options: options
        });
    };

    RegionSelect.prototype._render = function (template, parameters) {
        var prop;
        var attributes = '';
        if (typeof parameters.attributes === 'object') {
            for(prop in parameters.attributes) {
                if(parameters.attributes.hasOwnProperty(prop)) {
                    attributes = attributes + " " + prop + "=\"" + parameters.attributes[prop] + "\"";
                }
            }
        }
        parameters['attributes'] = attributes;

        for(prop in parameters) {
            if(parameters.hasOwnProperty(prop)) {
                template = template.replace("%" + prop + "%", parameters[prop]);
            }
        }

        return template;
    };

    RegionSelect.prototype._getOrderedRegionsForCountry = function (country) {
        var regions = {};
        var model;
        var len = this._regionCollection.length;
        var i;
        var keys = [];

        for (i = 0; i < len; ++i) {
            model = this._regionCollection[i];
            if (model.country === country) {
                regions[model.names[this._options.language]] = model;
                keys.push(model.names[this._options.language]);
            }
        }
        keys.sort();

        var ordered = [];
        len = keys.length;
        for (i = 0; i < len; ++i) {
            ordered.push(regions[keys[i]]);
        }

        return ordered;
    };

    return RegionSelect;
}));
