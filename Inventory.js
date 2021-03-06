
 $(document).on('click', '.btn.IP', function(btn) { gotoIP(btn.currentTarget.innerHTML); });// Bind future DOMs
 $(document).on('click', '.btn.domain', function(btn) { gotoDomain(btn.currentTarget.innerHTML); });// Bind future DOMs
 $(document).on('click', '#IP', function(btn) { i = 2; toggle(); });// Bind future DOMs
 $(document).on('click', '#domain', function(btn) { i = 0; toggle(); });// Bind future DOMs
 $(document).on('click', '#software', function(btn) { i = 1; toggle(); });// Bind future DOMs
 $('.search-query').focus();


function gotoDomain(dom)
 {
  $('.search-query').focus();
  $('.search-query').val(dom);
  i = 0;//so that toggle can advance it to the next level
  toggle();
  search();
 }

function gotoIP(ip)
 {
  console.log(ip);
  $('.search-query').focus();
  $('.search-query').val(ip);
  i = 2;//so that toggle can advance it to the next level
  toggle();
  search();
 }

function search()
 {
  $('table').html('');
  var q = $('.search-query').val();
  q = q + '';
  result = [];
  if(i == 0)
   {// Search for IPs
    searchForIP(q);
   }
  if(i == 1)
   {// Search in Domains
    searchForDomain(q);
   }
  if(i == 2)
   {// Search for softwares
    searchForSoftware(q);
   }
 }


function searchForSoftware(q)
  {
   $('table').html('<thead><tr><th>Software</th><th>Domains</th></tr></thead>');
   var rs = new Array();
   softwares.forEach(function(s)
    {
     if(s.toLowerCase().indexOf(q.toLowerCase()) != -1)
      {
       console.log(s);
       console.log((softwares).indexOf(s));
       $('table').append('<tr id = "'+(softwares).indexOf(s)+'"><td>'+s+'</td><td>Getting Domains...</td></tr>');
       rs[rs.length] = (softwares).indexOf(s);
      }
    });
   populateDomainsForSoftwares(rs);
  }


function populateDomainsForSoftwares(rs)
 {
  console.log(rs);
  rs.forEach(function(s){
    console.log($('#'+s).find('td')[1]);
    $($('#'+s).find('td')[1]).html(' ');
    domains.forEach(function(d){
     d.softwares.forEach(function(sof)
      {
       if(sof == s)
        {
         $($('#'+s).find('td')[1]).append('<span class="label">'+d.name+'</span>');
        }

      });
    })
  }) ;
 }

function searchForDomain(q)
 {
  $('table').html('<thead><tr><th>Domain</th><th>Owner</th><th>Web</th><th>App</th><th>DB</th><th>Other</th></tr></thead>');
    domains.forEach(function(d){
     if(d.name.toLowerCase().indexOf(q.toLowerCase()) != -1)
      {
       result[result.length] = d;
       $('table').append('<tr id = "'+domains.indexOf(d)+'"><td>'+d.name+'</td><td>'+d.owner+'</td><td class = "web '+domains.indexOf(d)+'"></td><td class = "app '+domains.indexOf(d)+'"></td><td class = "db '+domains.indexOf(d)+'"></td><td class = "other '+domains.indexOf(d)+'"></td></tr>');
       machineFor(domains.indexOf(d));
      }
    });
 }

function searchForIP(q)
 {
  $('table').html('<thead><tr><th>IP</th><th>Domains</th></tr></thead>');
    // Search IP
    IP.forEach(function(ip){
     if(ip.ip.indexOf(q) != -1)
      {
       result[result.length] = ip;
       var dom = extractDomains(ip.domains);
       $('table').append('<tr id = "'+IP.indexOf(ip)+'"><td><a href="#" class="btn btn-success" >'+ip.ip+'</a></td><td>'+dom+'</td></tr>');
      }
    });
 }

function machineFor(domainID)//type 0 = Web, 1 = App, 2 = DB
 { //Get into each IP and find if the given domain exists there
  IP.forEach(function(i){
   i.domains.forEach(function(d){
    if(d.id == domainID)
     {
      if(d.type.w == 1)
       {
        $('.web.'+domainID).append('<a href="#" class="btn IP" >'+i.ip+'</a>');
       }
      if(d.type.a == 1)
       {
        $('.app.'+domainID).append('<a href="#" class="btn IP" >'+i.ip+'</a>');
       }
      if(d.type.d == 1)
       {
        $('.db.'+domainID).append('<a href="#IP" class = "btn IP">'+i.ip+'</a>');
       }
      else;
     }
   });
  });
 }

function extractDomains(d)
 {
  var rs = '';
  d.forEach(function(dom){
//   console.log(dom);
   rs = rs + '<button class = "btn btn-info domain">'+domains[dom.id].name+'</button>';
  });
  return rs;
 }

function toggle()
 {
  $('.active').removeClass('active');

  i += 1;
  i = i % 3;
  $('#'+classes[i]).addClass('active');
  $('.content').html(searchmodes[i]);
  search();
 }

function getIP()
 {
  var url = './IP';
  $.get(url, function(j){
    var json = jQuery.parseJSON(j);
    IP = json;
   });
 }


function getDomains()
 {
  var url = './domains';
  $.get(url, function(j){
    var json = jQuery.parseJSON(j);
    domains = json;
   });

 }
function getSoftwares()
 {
  var url = './softwares';
  $.get(url, function(j){
    var json = jQuery.parseJSON(j);
    softwares = json;
   });
 }

