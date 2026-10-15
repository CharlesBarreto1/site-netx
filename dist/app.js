'use strict';

const products = {
  provider: {name:'Provider',category:'Gestão de provedores',title:'O negócio do provedor,\nem uma visão integrada.',description:'Gestão de clientes, contratos, financeiro, atendimento e recursos da operação. O Provider organiza a dimensão comercial e administrativa do provedor de internet.',features:['Clientes e contratos','Financeiro e cobrança','Atendimento e operação'],tags:['Gestão','Operação','Relacionamento'],symbol:'P',color:'#164be2',surface:'#e8eefb'},
  sign: {name:'Sign',category:'Assinatura eletrônica',title:'Documentos conectados.\nAcordos em movimento.',description:'Assinatura eletrônica e acompanhamento do fluxo de documentos. Uma solução com identidade própria, pensada para empresas de diferentes segmentos e integração por API.',features:['Fluxo de documentos','Participantes e acompanhamento','Integração por API'],tags:['Documentos','Assinatura','Acompanhamento'],symbol:'S',color:'#1456e0',surface:'#e8eefb'},
  nms: {name:'NMS',category:'Operação de redes',title:'A operação da rede,\nmais perto de você.',description:'Administração técnica de equipamentos de rede. O NMS reúne o foco em infraestrutura e acesso, com configuração, diagnóstico e gestão dos equipamentos da operação.',features:['Infraestrutura de rede','Configuração e diagnóstico','Acesso e equipamentos'],tags:['Infraestrutura','Acesso','Diagnóstico'],symbol:'N',color:'#135d89',surface:'#e6f1f7'},
  observe: {name:'Observe',category:'Observabilidade',title:'Mais contexto para\nentender sua rede.',description:'Saúde, qualidade, histórico e incidentes de redes e infraestrutura. O Observe reúne observabilidade e sondas para apoiar a leitura do que acontece na operação.',features:['Latência e perda','Métricas e disponibilidade','Histórico e incidentes'],tags:['Saúde','Conectividade','Histórico'],symbol:'O',color:'#246450',surface:'#e6f2ed'},
  fiberdocs: {name:'FiberDocs',category:'Engenharia de redes ópticas',title:'Cada fibra faz parte\nde uma história maior.',description:'Documentação e engenharia da rede óptica: da planta geográfica à conectividade entre fibras, caixas, portas e emendas. Informação organizada para implantação e manutenção.',features:['Planta e estrutura física','Fibras e conectividade','Documentação da rede'],tags:['Planta','Conectividade','Engenharia'],symbol:'F',color:'#6752a5',surface:'#eeebf8'},
  field: {name:'Field',category:'Serviços em campo',title:'Da solicitação\nao serviço concluído.',description:'Planejamento e execução de serviços em campo, com foco em gestores e técnicos. O Field organiza atribuição, execução e evidências, com integração inicial ao Provider.',features:['Planejamento e atribuição','Execução e evidências','Integrado ao Provider'],tags:['Planejar','Executar','Concluir'],symbol:'F',color:'#945223',surface:'#faf0e5'},
  kubia: {name:'Kubia',category:'Criação e fabricação 3D',title:'Da ideia à forma.\nDo digital ao tangível.',description:'Criação e preparação de peças para fabricação 3D. O Kubia conecta projetos digitais a aplicações físicas, com serviços para criadores e projetos personalizados.',features:['Criação de peças','Preparação para fabricação','Projetos personalizados'],tags:['Criar','Preparar','Materializar'],symbol:'K',color:'#a43956',surface:'#f8eaf0'}
};

const productTabs = [...document.querySelectorAll('[data-product]')];
const productPanel = document.querySelector('#product-panel');
function selectProduct(key, focus = false) {
  const product = products[key];
  if (!product) return;
  for (const tab of productTabs) {
    const selected = tab.dataset.product === key;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    if (selected && focus) {tab.focus();tab.scrollIntoView({block:'nearest',inline:'nearest',behavior:'instant'});}
  }
  productPanel.setAttribute('aria-labelledby', 'tab-' + key);
  document.querySelector('#product-category').textContent = product.category.toLocaleUpperCase('pt-BR');
  const title = document.querySelector('#product-title');
  title.replaceChildren();
  product.title.split('\n').forEach((line,index) => {if(index) title.append(document.createElement('br'));title.append(document.createTextNode(line));});
  document.querySelector('#product-description').textContent = product.description;
  document.querySelector('#visual-product').textContent = product.name.toUpperCase();
  const symbol = document.querySelector('#product-symbol');
  symbol.replaceChildren(document.createTextNode(product.symbol));
  const arrow = document.createElement('span');arrow.textContent='↗';symbol.append(arrow);
  symbol.style.color = product.color;
  document.querySelector('.product-visual').style.background = product.surface;
  const features = document.querySelector('#product-features');features.replaceChildren();
  for(const feature of product.features){const li=document.createElement('li');li.textContent=feature;features.append(li);}
  const tags = document.querySelector('#visual-tags');tags.replaceChildren();
  for(const tag of product.tags){const span=document.createElement('span');span.textContent=tag;tags.append(span);}
  const contact = document.querySelector('#product-contact');
  contact.replaceChildren(document.createTextNode('Conversar sobre o ' + product.name + ' '));
  const linkArrow=document.createElement('span');linkArrow.textContent='↗';linkArrow.setAttribute('aria-hidden','true');contact.append(linkArrow);
  contact.dataset.interest = 'NetX ' + product.name;
}
for(const [index,tab] of productTabs.entries()){
  tab.addEventListener('click',()=>selectProduct(tab.dataset.product));
  tab.addEventListener('keydown',event=>{
    let target;
    if(['ArrowDown','ArrowRight'].includes(event.key))target=(index+1)%productTabs.length;
    if(['ArrowUp','ArrowLeft'].includes(event.key))target=(index-1+productTabs.length)%productTabs.length;
    if(event.key==='Home')target=0;
    if(event.key==='End')target=productTabs.length-1;
    if(target!==undefined){event.preventDefault();selectProduct(productTabs[target].dataset.product,true);}
  });
}
const tabOrientation = matchMedia('(max-width: 700px)');
function updateTabOrientation(){document.querySelector('.product-tabs').setAttribute('aria-orientation',tabOrientation.matches?'horizontal':'vertical');}
updateTabOrientation();tabOrientation.addEventListener('change',updateTabOrientation);

const menuToggle=document.querySelector('.menu-toggle');
const navigation=document.querySelector('.navigation');
function closeMenu(){menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Abrir menu');navigation.classList.remove('is-open');}
menuToggle.addEventListener('click',()=>{const isOpen=menuToggle.getAttribute('aria-expanded')==='true';menuToggle.setAttribute('aria-expanded',String(!isOpen));menuToggle.setAttribute('aria-label',isOpen?'Abrir menu':'Fechar menu');navigation.classList.toggle('is-open',!isOpen);});
navigation.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menuToggle.getAttribute('aria-expanded')==='true'){closeMenu();menuToggle.focus();}});
document.addEventListener('click',event=>{if(!event.target.closest('.header'))closeMenu();});

document.addEventListener('click',event=>{const link=event.target.closest('[data-interest]');if(link)document.querySelector('#interest').value=link.dataset.interest;});

let preparedMessage='';
document.querySelector('#contact-form').addEventListener('submit',event=>{
  event.preventDefault();
  const form=event.currentTarget;
  if(!form.reportValidity())return;
  const values=new FormData(form);
  const name=String(values.get('name')||'').trim();
  const message=String(values.get('message')||'').trim();
  if(!name||message.length<10){document.querySelector('#form-status').textContent='Preencha seu nome e descreva seu projeto com pelo menos 10 caracteres.';return;}
  preparedMessage='Olá, NetX! Quero conversar sobre um projeto.\n\nNome: '+name+'\n'+(String(values.get('company')||'').trim()?'Empresa: '+String(values.get('company')).trim()+'\n':'')+'E-mail: '+String(values.get('email')).trim()+'\nAssunto: '+String(values.get('interest'))+'\n\n'+message;
  const url='https://wa.me/5544920062580?text='+encodeURIComponent(preparedMessage);
  document.querySelector('#whatsapp-fallback').href=url;
  document.querySelector('#email-fallback').href='mailto:contato@netx.dev.br?subject='+encodeURIComponent('Contato pelo site — '+String(values.get('interest')))+'&body='+encodeURIComponent(preparedMessage);
  document.querySelector('#form-fallback').hidden=false;
  document.querySelector('#form-status').textContent='Mensagem preparada. Revise e confirme o envio no WhatsApp. Você também pode copiar o texto ou enviar por e-mail abaixo.';
  window.open(url,'_blank','noopener,noreferrer');
});
document.querySelector('#copy-message').addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText(preparedMessage);document.querySelector('#form-status').textContent='Mensagem copiada. Cole no canal em que deseja conversar com a NetX.';}
  catch{document.querySelector('#form-status').textContent='Não foi possível copiar automaticamente. Use os links para WhatsApp ou e-mail.';}
});

const privacyDialog=document.querySelector('#privacy-dialog');
for(const id of ['privacy-open','privacy-footer'])document.getElementById(id).addEventListener('click',()=>privacyDialog.showModal());
document.querySelector('#privacy-close').addEventListener('click',()=>privacyDialog.close());
privacyDialog.addEventListener('click',event=>{if(event.target===privacyDialog){const bounds=privacyDialog.getBoundingClientRect();if(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom)privacyDialog.close();}});
document.querySelector('#year').textContent=new Date().getFullYear();
