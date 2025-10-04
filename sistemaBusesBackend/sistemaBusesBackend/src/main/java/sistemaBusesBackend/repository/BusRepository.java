package sistemaBusesBackend.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import sistemaBusesBackend.entity.Bus;

@Repository
public interface BusRepository extends JpaRepository<Bus, Long> {
	@Query("SELECT b FROM Bus b JOIN FETCH b.marca")
	Page<Bus> findAllWithMarca(Pageable pageable);
}
