package com.ssafy.fly.config;

import com.ssafy.fly.common.util.JwtAuthenticationFilter;
import com.ssafy.fly.common.util.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsUtils;


@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public SecurityConfig(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Bean
    public PasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .formLogin().disable();

        http.cors();

        http.httpBasic().disable().authorizeRequests()
                .requestMatchers(CorsUtils::isPreFlightRequest).permitAll()
                .antMatchers("/auth/**").permitAll()
                .antMatchers("/user/chkId/**", "/user/register", "/user/findId", "/user/findPassword", "/user/chkNickname/**").permitAll()
                .antMatchers(HttpMethod.GET, "/feed/**").permitAll()
                .antMatchers(HttpMethod.GET, "/review/{storeId}").permitAll()
                .antMatchers("/user/store/**").permitAll()
                .antMatchers("/user/stores/**").permitAll()
                .antMatchers("/custom/recommend/**").permitAll()
                .antMatchers("/api/index.html").permitAll()
                //.antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider),
                UsernamePasswordAuthenticationFilter.class); // JwtAuthenticationFilter??? UsernamePasswordAuthenticationFilter ?????? ?????????
        // + ????????? ????????? ??????????????? ??????????????? ?????? ????????? CustomUserDetailService ???????????? ???????????????.
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        final CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOriginPatterns(Collections.singletonList("*"));
//        configuration.addAllowedHeader("*");
//        configuration.addAllowedMethod("*");
//        configuration.setAllowCredentials(true);
//
//        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }
}