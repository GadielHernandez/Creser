const USER = 'USER'
const TEACHER = 'TEACHER'
const ADMIN = 'ADMIN'

const atLeastUserIs = (user, level) => {
    if(!user || !level) return
    let allow = false
    
    switch (level) {
        case USER:
            allow = user === USER || 
                    user === TEACHER || 
                    user === ADMIN
            break;
    
        case TEACHER:
            allow = user === TEACHER || 
                    user === ADMIN
            break;
        
        case ADMIN:
            allow = user === ADMIN
            break;
    }

    return allow
}

export {
    USER,
    TEACHER,
    ADMIN,
    atLeastUserIs
}