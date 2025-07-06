package com.rma.barbersantos.services;

import com.rma.barbersantos.repository.UsuarioRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    public AuthenticationService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    /**
     * Este método é chamado pelo Spring Security quando um usuário tenta se autenticar.
     * Ele busca o usuário pelo login (no nosso caso, o e-mail).
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // O Spring Security espera que a entidade Usuario implemente a interface UserDetails.
        // Vamos fazer esse ajuste a seguir.
        return usuarioRepository.findByEmail(username);
    }
}
