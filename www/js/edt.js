var panelDay = '0%2C1%2C2%2C3%2C4%2C5';
var height = 1500;
var width = 950;
var currentWeek = (DefSemaineNum() + 17) % 52;
var src;
var identifier = "";
var projectId = "";
var idTree = 0;

function EDTMain() {
    $$("#edtsection").hide();
    $$("#edtclasse").hide();
    $$("#edtgroupe").hide();
    $$("#edtmain").show();
    return false;
}

function EDTSection(section) {
    app.preloader.show();
    app.request.post(API, {
        action: 'edt-sections',
        'classe': section,
        'token': window.localStorage.getItem('userToken')
    }, function (data) {
        app.preloader.hide();
        data = JSON.parse(data);
        if(data['error'])
        {
            app.dialog.alert('Problème lors de la récupération des données', 'Erreur');
            return;
        }
        sections = JSON.parse(data['data']);
        textHTML = '<div class="row"><div class="col-33" ontouchend="javascript:EDTMain();"><div class="button">Retour</div></div><div class="col-33" ontouchend="javascript:EDTMain();"><div class="button">Accueil</div></div><div class="col-33" ontouchend="/*javascript:EDTSection(\'STH\');*/"><div class="button">Favoris</div></div></div>';
        for (var i = 0; i < sections.length; i++) {
            if (i % 2 == 0)
                textHTML += '<div class="row">';
            textHTML += '<div class="col-50" ontouchend="javascript:EDTClasse(\'' + section + '\',\'' + sections[i] + '\');"><div class="button">' + sections[i] + '</div></div>';
            if (i % 2 == 1)
                textHTML += '</div>';
        }
        if (sections.length % 2 == 1)
            textHTML += '</div>';
        $$("#edtsection").html(textHTML);
        $$("#edtmain").hide();
        $$("#edtclasse").hide();
        $$("#edtgroupe").hide();
        $$("#edtsection").show();
        return false;
    }, function () {
        app.preloader.hide();
        app.dialog.alert('Connexion au serveur impossible', 'Erreur');
    });
}

function EDTClasse(section, classe) {
    app.preloader.show();
    app.request.post(API, {
        action: 'edt-classes',
        'classe': section,
        'section': classe,
        'token': window.localStorage.getItem('userToken')
    }, function (data) {
        app.preloader.hide();
        data = JSON.parse(data);
        if(data['error'])
        {
            app.dialog.alert('Problème lors de la récupération des données', 'Erreur');
            return;
        }
        sections = JSON.parse(data['data']);
        textHTML = '<div class="row"><div class="col-50" ontouchend="javascript:EDTSection(\'' + section + '\');"><div class="button">Retour</div></div><div class="col-50" ontouchend="javascript:EDTMain();"><div class="button">Accueil</div></div></div>';
        for (var i = 0; i < sections.length; i++) {
            if (i % 2 == 0)
                textHTML += '<div class="row">';
            textHTML += '<div class="col-50" ontouchend="javascript:EDTGroupe(\'' + section + '\',\'' + classe + '\',\'' + sections[i] + '\');"><div class="button">' + sections[i] + '</div></div>';
            if (i % 2 == 1)
                textHTML += '</div>';
        }
        if (sections.length % 2 == 1)
            textHTML += '</div>';
        $$("#edtsection").html(textHTML);
        $$("#edtmain").hide();
        $$("#edtclasse").hide();
        $$("#edtgroupe").hide();
        $$("#edtsection").show();
        return false;
    }, function () {
        app.preloader.hide();
        app.dialog.alert('Connexion au serveur impossible', 'Erreur');
    });
}

function EDTGroupe(section, classe, groupe) {
    app.preloader.show();
    app.request.post(API, {
        action: 'edt-groupes',
        'classe': section,
        'section': classe,
        'groupe': groupe,
        'token': window.localStorage.getItem('userToken')
    }, function (data) {
        app.preloader.hide();
        data = JSON.parse(data);
        if(data['error'])
        {
            app.dialog.alert('Problème lors de la récupération des données', 'Erreur');
            return;
        }
        sections = JSON.parse(data['data']);
        idTree = sections['id'];
        identifier = sections['identifier'];
        projectId = sections['project'];
        panelDay = '0%2C1%2C2%2C3%2C4%2C5';
        $$("#edtsection").hide();
        $$("#edtclasse").hide();
        $$("#edtmain").hide();
        $$("#edtgroupe").show()
        $$("#navedtgroupe").html('<div class="row"><div class="col-33" ontouchend="javascript:EDTClasse(\'' + section + '\',\'' + classe + '\');"><div class="button">Retour</div></div><div class="col-33" ontouchend="javascript:EDTMain();"><div class="button">Accueil</div></div><div class="col-33" ontouchend="/*javascript:EDTClasse(\'STH\');*/"><div class="button">Ajouter</div></div></div>')
        viewToday();
        return false;
    }, function () {
        app.preloader.hide();
        app.dialog.alert('Connexion au serveur impossible', 'Erreur');
    });
    arr = ["Erreur"];
    return false;
}

function afficheEdt() {
    src = "http://edt.insa-strasbourg.fr:8080/ade/imageEt?identifier=" + identifier + "&projectId=" + projectId + "&idPianoWeek=" + currentWeek + "&idPianoDay=" + panelDay + "&idTree=" + idTree + "&width=" + width + "&height=" + height + "&lunchName=REPAS&displayMode=1057855&showLoad=false&ttl=1410813001728&displayConfId=4";
    $$('#planning').attr('src', src).css('display', 'inline-block')
}

function Suiv() {
    currentWeek = currentWeek + 1;
    afficheEdt();
}

function Prec() {
    currentWeek = currentWeek - 1;
    afficheEdt();
}

function jourSuivant() {
    switch (panelDay) {
        case '0':
            panelDay = '%2C1';
            break;
        case '%2C1':
            panelDay = '%2C2';
            break;
        case '%2C2':
            panelDay = '%2C3';
            break;
        case '%2C3':
            panelDay = '%2C4';
            break;
        case '%2C4':
            panelDay = '%2C5';
            break;
        case '%2C5':
            panelDay = '0';
            currentWeek = currentWeek + 1;
            break
    }
    afficheEdt()
}

function jourPrecedent() {
    switch (panelDay) {
        case '0':
            panelDay = '%2C5';
            currentWeek = currentWeek - 1;
            break;
        case '%2C1':
            panelDay = '0';
            break;
        case '%2C2':
            panelDay = '%2C1';
            break;
        case '%2C3':
            panelDay = '%2C2';
            break;
        case '%2C4':
            panelDay = '%2C3';
            break;
        case '%2C5':
            panelDay = '%2C4';
            break
    }
    afficheEdt()
}

function DefSemaineNum() {
    var MaDate = new Date();
    var mm = MaDate.getMonth();
    var jj = MaDate.getDate();
    var annee = MaDate.getFullYear();
    var NumSemaine = 0,
        ListeMois = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    if (annee % 4 === 0 && annee % 100 !== 0 || annee % 400 === 0) {
        ListeMois[1] = 29;
    }
    var TotalJour = 0;
    var cpt;
    for (cpt = 0; cpt < mm; cpt++) {
        TotalJour += ListeMois[cpt];
    }
    TotalJour += jj;
    DebutAn = new Date(annee, 0, 1);
    var JourDebutAn;
    JourDebutAn = DebutAn.getDay();
    if (JourDebutAn === 0) {
        JourDebutAn = 7;
    }
    TotalJour -= 8 - JourDebutAn;
    NumSemaine = 1;
    NumSemaine += Math.floor(TotalJour / 7);
    if (TotalJour % 7 !== 0) {
        NumSemaine += 1;
    }
    return (NumSemaine);
}

function viewToday() {
    var jour = new Date();
    var a = jour.getDay();
    currentWeek = (DefSemaineNum() + 17) % 52;
    if (panelDay === '0%2C1%2C2%2C3%2C4%2C5') {
        switch (a) {
            case 0:
                panelDay = '0';
                currentWeek = (DefSemaineNum() + 18) % 52;
                break;
            case 1:
                panelDay = '0';
                break;
            case 2:
                panelDay = '%2C1';
                break;
            case 3:
                panelDay = '%2C2';
                break;
            case 4:
                panelDay = '%2C3';
                break;
            case 5:
                panelDay = '%2C4';
                break;
            case 6:
                panelDay = '%2C5';
                break
        }
        width = 288;
        $$('.imageduplanning').css('width', '288px');
        $$('#bouton_prec').attr('ontouchend', 'jourPrecedent();');
        $$('#bouton_suiv').attr('ontouchend', 'jourSuivant();')
    } else {
        panelDay = '0%2C1%2C2%2C3%2C4%2C5';
        width = 950;
        $$('.imageduplanning').css('width', '100%');
        $$('#bouton_prec').attr('ontouchend', 'Prec();');
        $$('#bouton_suiv').attr('ontouchend', 'Suiv();');
    }
    afficheEdt()
}