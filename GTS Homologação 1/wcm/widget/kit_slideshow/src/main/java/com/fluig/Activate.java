package com.fluig;

import javax.ejb.Singleton;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fluig.sdk.api.FluigAPI;
import com.fluig.sdk.api.common.SDKException;
import com.fluig.sdk.api.component.activation.ActivationEvent;
import com.fluig.sdk.api.component.activation.ActivationListener;
import com.fluig.sdk.api.oauth.OAuthSdkVO;


@Singleton(mappedName = "activator/kit_slideshow", name = "activator/kit_slideshow")
public class Activate implements ActivationListener {


    private static Logger log = LoggerFactory.getLogger(Activate.class);

    private FluigAPI fluigAPI;

    @Override
    public String getArtifactFileName() throws Exception {
        return "wcm-widget-slideshow.war";
    }

    @Override
    @TransactionAttribute(TransactionAttributeType.REQUIRED)
    public void install(ActivationEvent event) throws Exception {
        OAuthSdkVO vo = new OAuthSdkVO();
        vo.setCode("instagram.demo");
        vo.setAuthenticationType("oauth2");
        vo.setDomain("https://api.instagram.com");
        vo.setClientId("638be507ceaf4ab7b2c40fbaf12c240e");
        vo.setClientSecret("75c9b362ce574d65b44029ef27261e2c");
        vo.setTokenAccess("3681322681.638be50.f2eaefc66254483d9298fb7649e1e553");
        vo.setServiceTestUrl("/v1/users/self");

        vo = getFluigAPI().getAuthorizeClientService().create(vo);
        if(vo.getId()!= null){
            log.info("serviço cadastrado com sucesso " + vo.getId());
        }

    }

    @Override
    public void disable(ActivationEvent evt) throws Exception {
    }

    @Override
    public void enable(ActivationEvent evt) throws Exception {
    }

    private FluigAPI getFluigAPI() throws SDKException {
        if (fluigAPI == null) {
            fluigAPI = new FluigAPI();
        }
        return fluigAPI;
    }

}
