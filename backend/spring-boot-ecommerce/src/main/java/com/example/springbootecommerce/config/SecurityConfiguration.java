package com.example.springbootecommerce.config;

import org.springframework.context.annotation.Bean;
import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;


@Configuration
public class SecurityConfiguration {
    @Bean
    protected SecurityFilterChain filterChain(HttpSecurity http) throws  Exception {

        // protect endpoint /api/orders
        http.authorizeHttpRequests(requests ->
                        requests
                                .requestMatchers("/api/orders/**")
                                .authenticated()
                                .anyRequest().permitAll())
                .oauth2ResourceServer()
                .jwt();

        //add CORS filters
        http.cors();

        // add content negotiation
        http.setSharedObject(ContentNegotiationStrategy.class,
                new HeaderContentNegotiationStrategy());

        // force a non-empty response body for 401's to make the response more friendly
        Okta.configureResourceServer401ResponseBody(http);

        // disable csrf since we are not using cookies for session tracking
        http.csrf().disable();
        return http.build();
    }
}
